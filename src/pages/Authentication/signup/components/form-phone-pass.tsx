import { useState } from "react"

import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
type FormPhonePasswordProps = {
    phone: string
}
export const FormPhonePassword = ({ phone }: FormPhonePasswordProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingOTP, setIsLoadingOTP] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const schema_phone_pass = z.object({
        phone: z.string().trim()
            .min(1, {
                message: 'Vui lòng nhập số điện thoại',
            }).max(11, { message: 'Số điện thoại không đúng định dạng', })
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
                message: 'Số điện thoại không đúng định dạng',
            }),
        password: z.string().trim().min(1, {
            message: 'Vui lòng nhập mật khẩu',
        }),
        confirmPassword: z.string().trim().min(1, {
            message: 'Vui lòng nhập lại mật khẩu',
        })
    }).refine((data) => data.confirmPassword === data.password, {
        path: ['confirmPassword'],
        message: 'Mật khẩu không trùng nhau '
    });
    const schema_otp = z.object({
        otp: z.string().trim().min(1, {
            message: 'Vui lòng mã otp',
        })
    })

    const form_phone_pass = useForm<z.infer<typeof schema_phone_pass>>({
        resolver: zodResolver(schema_phone_pass),
        defaultValues: {
            phone: "",
            password: "",
            confirmPassword: "",
        },
    })
    const form__otp = useForm<z.infer<typeof schema_otp>>({
        resolver: zodResolver(schema_otp),
        defaultValues: {
            otp: "",
        },
    })
    if (phone) {
        form_phone_pass.setValue('phone', phone)
    }
    function onSubmitPhonePass(values: z.infer<typeof schema_phone_pass>) {
        setIsLoading(true)
        setOpenDialog(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        console.log(values);

    }
    function onSubmitOtp(values: z.infer<typeof schema_otp>) {
        setIsLoadingOTP(true)
        setTimeout(() => {
            setIsLoadingOTP(false)
        }, 3000)
        console.log(values);
    }
    return (
        <>
            <Form {...form_phone_pass}>
                <form onSubmit={form_phone_pass.handleSubmit(onSubmitPhonePass)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form_phone_pass.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Số điện thoại</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0912345678" {...field} />
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
                                        <PasswordInput placeholder="*********" {...field} />
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
                                        <PasswordInput placeholder="*********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            Đăng ký
                        </Button>
                    </div>
                </form>
            </Form>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Nhập mã OTP</DialogTitle>
                        <DialogDescription>
                            Hãy nhập mã OTP đã được gửi đến số điện thoại của bạn.
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="link" className="sr-only">
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue="https://ui.shadcn.com/docs/installation"
                                readOnly
                            />
                        </div>
                    </div> */}
                    <Form {...form__otp}>
                        <form onSubmit={form__otp.handleSubmit(onSubmitOtp)}>
                            <div className="grid gap-2">
                                <FormField
                                    control={form__otp.control}
                                    name="otp"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mã OTP</FormLabel>
                                            <FormControl>
                                                <Input placeholder="0912345678" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex-col items-center justify-between space-x-4">
                                    <Button disabled={isLoadingOTP}>
                                        {isLoadingOTP && (
                                            <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                                        )}
                                        Xác nhận
                                    </Button>
                                    <DialogClose asChild>
                                        <Button type="button" variant="secondary">
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
    )

}