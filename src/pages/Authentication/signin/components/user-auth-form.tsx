import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password";
import { signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, provider } from '@/lib/firebase';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user] = useAuthState(auth);

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            location.href = "/";
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };
    useEffect(() => {
        auth.signOut();
        console.log(user);
    }, [])
    const schema_auth = z.object({
        email: z.string().trim().min(1, {
            message: 'Vui lòng nhập email',
        }).email({
            message: 'Email không đúng định dạng',
        }),
        password: z.string().trim().min(1, {
            message: 'Vui lòng nhập mật khẩu',
        }),
    })

    const form_auth = useForm<z.infer<typeof schema_auth>>({
        resolver: zodResolver(schema_auth),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmitEmail(values: z.infer<typeof schema_auth>) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        console.log(values);

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form_auth}>
                <form onSubmit={form_auth.handleSubmit(onSubmitEmail)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form_auth.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email@gmail.com" {...field} />
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
                            {isLoading && (
                                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                            )}
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
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Icons.phone className="w-5 h-5 mr-2" />
                )}{" "}
                Số điện thoại
            </Button>
            <Button onClick={signInWithGoogle} variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Icons.google className="w-4 h-4 mr-2" />
                )}{" "}
                Tài khoản Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Icons.facebook className="w-6 h-6 mr-2" />
                )}{" "}
                Tài khoản Facebook
            </Button>
        </div >
    )
}