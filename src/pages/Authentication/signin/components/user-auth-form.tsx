import { useEffect, useState } from "react"

import { cn, setLSData } from "@/lib/utils"
import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password";
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/lib/firebase';
import { toast } from "sonner";
import http from "@/utils/http";
import { Show } from "@/components/utility/Show";


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        auth.signOut();
    }, [])
    const signInWithGoogle = async () => {
        signInWithPopup(auth, googleProvider).then(res => {
            console.log(res.user);
            let user = res.user as any
            if (user) {
                let newUser = {
                    uid: user.uid,
                    display_name: user.providerData[0].displayName,
                    register_type: user.providerData[0].providerId,
                    photo: user.providerData[0].photoURL,
                    email: user.providerData[0].email,
                    phone: user.providerData[0].phoneNumber,
                }
                setLSData('access_token', user.accessToken);
                setLSData('user', newUser);
                createNewUser(user, newUser);
            }
        }).catch((error) => {
            console.error("Error signing in with Google:", error);
            if ('auth/user-disabled' === error.code) {
                toast.warning('Tài khoản Facabook của bạn có email đã được sử dụng', { position: 'top-right' })
            }
        })
    };
    const signInWithFacebook = async () => {
        signInWithPopup(auth, facebookProvider).then(res => {
            let user = res.user as any
            if (user) {
                let newUser = {
                    uid: user.uid,
                    display_name: user.providerData[0].displayName,
                    register_type: user.providerData[0].providerId,
                    photo: user.providerData[0].photoURL,
                    email: user.providerData[0].email,
                    phone: user.providerData[0].phoneNumber,
                }
                setLSData('access_token', user.accessToken);
                setLSData('user', newUser);
                createNewUser(user, newUser);
            }
        }).catch((error) => {
            console.error("Error signing in with Facebook:", error);
            if ('auth/account-exists-with-different-credential' === error.code) {
                toast.warning('Tài khoản Facabook của bạn đã sử dụng email đã tồn tại', { position: 'top-right' })
            }
        })
    };

    const createNewUser = (user, newUser) => {
        http.post('/exe/users/uid-check', { uid: user.uid }, false).then((res) => {
            if (res.resp.code) {
                http.post('/exe/register', newUser, false).then((res) => {
                    if (!res.resp.code) {
                        toast.error('Tạo tài khoản không thành công', { position: 'top-right' })
                    } else {
                        window.location.href = '/';
                    }
                }).catch(err => {
                    console.error('Create user with not working:', err)
                })
            } else {
                window.location.href = '/';
            }
        }).catch(err => {
            console.error('check uid not working:', err)
        })
    }

    const schema_auth = z.object({
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
    })

    const form_auth = useForm<z.infer<typeof schema_auth>>({
        resolver: zodResolver(schema_auth),
        defaultValues: {
            phone: "",
            password: "",
        },
    })

    function onSubmitPhone(values: z.infer<typeof schema_auth>) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        console.log(values);

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form_auth}>
                <form onSubmit={form_auth.handleSubmit(onSubmitPhone)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form_auth.control}
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
                            control={form_auth.control}
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
                        <Button disabled={isLoading}>
                            <Show>
                                <Show.When isTrue={isLoading}>
                                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                                </Show.When>
                            </Show>
                            Đăng nhập
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                        Hoặc tiếp tục với
                    </span>
                </div>
            </div>
            <Button onClick={signInWithGoogle} variant="outline" type="button" disabled={isLoading}>
                <Show>
                    <Show.When isTrue={isLoading}>
                        <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    </Show.When>
                    <Show.Else >
                        <Icons.google className="w-4 h-4 mr-2" />
                    </Show.Else>
                </Show>
                Tài khoản Google
            </Button>
            <Button onClick={signInWithFacebook} variant="outline" type="button" disabled={isLoading}>
                <Show>
                    <Show.When isTrue={isLoading}>
                        <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                    </Show.When>
                    <Show.Else >
                        <Icons.facebook className="w-6 h-6 mr-2" />
                    </Show.Else>
                </Show>
                Tài khoản Facebook
            </Button>
        </div >
    )
}