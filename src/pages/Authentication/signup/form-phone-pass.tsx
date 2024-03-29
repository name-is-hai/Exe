import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp';
import { PasswordInput } from '@/components/ui/password';
import { auth } from '@/lib/firebase';
import { setDocsUserChats } from '@/services/firebase.service';
import http from '@/utils/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

export const FormPhonePassword = ({ phone }) => {
  const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [result, setResult] = useState<any>();
  const schema_phone_pass = z
    .object({
      phone: z
        .string()
        .trim()
        .min(1, {
          message: 'Vui lòng nhập số điện thoại',
        })
        .max(11, { message: 'Số điện thoại không đúng định dạng' })
        .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
          message: 'Số điện thoại không đúng định dạng',
        }),
      password: z.string().trim().min(1, {
        message: 'Vui lòng nhập mật khẩu',
      }),
      confirmPassword: z.string().trim().min(1, {
        message: 'Vui lòng nhập lại mật khẩu',
      }),
    })
    .refine((data) => data.confirmPassword === data.password, {
      path: ['confirmPassword'],
      message: 'Mật khẩu không trùng nhau ',
    });

  const schema_otp = z.object({
    otp: z.string().trim().min(1, {
      message: 'Vui lòng mã OTP',
    }),
  });

  const form_phone_pass = useForm<z.infer<typeof schema_phone_pass>>({
    resolver: zodResolver(schema_phone_pass),
    defaultValues: {
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });
  if (phone) {
    form_phone_pass.setValue('phone', phone);
  }
  const form__otp = useForm<z.infer<typeof schema_otp>>({
    resolver: zodResolver(schema_otp),
    defaultValues: {
      otp: '',
    },
  });
  function onSubmitPhonePass(values: z.infer<typeof schema_phone_pass>) {
    // setIsLoading(true)
    let formatPhone;
    if (values.phone.charAt(0) === '0') {
      formatPhone = '+84' + values.phone.slice(1);
    } else {
      formatPhone = values.phone;
    }
    const verify = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'normal' });
    signInWithPhoneNumber(auth, formatPhone, verify)
      .then((result) => {
        setOpenDialog(true);
        setResult(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function onSubmitOtp(values: z.infer<typeof schema_otp>) {
    setIsLoadingOTP(true);
    result
      .confirm(values.otp)
      .then((result) => {
        setIsLoadingOTP(false);
        createNewUser(result.user);
      })
      .catch((err) => {
        console.log('Incorrect code', err);
        setIsLoadingOTP(false);
        toast.warning('Mã OTP không chính xác, vui lòng nhập lại', { position: 'top-right' });
      });
  }

  const createNewUser = (user) => {
    const newUser = {
      uid: user.uid,
      display_name: user.providerData[0].displayName,
      register_type: user.providerData[0].providerId,
      photo: user.providerData[0].photoURL,
      email: user.providerData[0].email,
      phone: user.providerData[0].phoneNumber.replace('+84', '0'),
      password: form_phone_pass.getValues('password'),
    };
    setDocsUserChats([user.uid], {});
    http
      .post('/exe/register', newUser, false)
      .then((res) => {
        if (!res.resp.code) {
          toast.error('Tạo tài khoản không thành công', { position: 'top-right' });
        } else {
          toast.success('Tạo tài khoản thành công, xin mời đăng nhập', { position: 'top-right' });
          setOpenDialog(false);
          setTimeout(() => {
            window.location.href = '/signin';
          }, 1000);
        }
      })
      .catch((err) => {
        console.error('Create user with phone and password not working:', err);
      });
  };
  return (
    <>
      <Form {...form_phone_pass}>
        <form onSubmit={form_phone_pass.handleSubmit(onSubmitPhonePass)}>
          <div className="grid mx-auto gap-y-2">
            <FormField
              control={form_phone_pass.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số điện thoại</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0912345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form_phone_pass.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form_phone_pass.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="*********"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div id="recaptcha-container"></div>
            <Button> Đăng ký </Button>
          </div>
        </form>
      </Form>
      <Dialog
        open={openDialog}
        onOpenChange={setOpenDialog}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nhập mã OTP</DialogTitle>
            <DialogDescription>Hãy nhập mã OTP đã được gửi đến số điện thoại của bạn.</DialogDescription>
          </DialogHeader>
          <Form {...form__otp}>
            <form onSubmit={form__otp.handleSubmit(onSubmitOtp)}>
              <div className="grid gap-2 place-items-center">
                <FormField
                  control={form__otp.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Mã OTP</FormLabel> */}
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          render={({ slots }) => (
                            <>
                              <InputOTPGroup>
                                {slots.slice(0, 3).map((slot, index) => (
                                  <InputOTPSlot
                                    key={index}
                                    {...slot}
                                  />
                                ))}{' '}
                              </InputOTPGroup>
                              <InputOTPSeparator />
                              <InputOTPGroup>
                                {slots.slice(3).map((slot, index) => (
                                  <InputOTPSlot
                                    key={index + 3}
                                    {...slot}
                                  />
                                ))}
                              </InputOTPGroup>
                            </>
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex-col items-center justify-between space-x-4">
                  <Button disabled={isLoadingOTP}>
                    {isLoadingOTP && <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />}
                    Xác nhận
                  </Button>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                    >
                      Đóng
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
