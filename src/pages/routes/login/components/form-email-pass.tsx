import { useState } from "react"

import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password";



export const FormEmailPassword = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const schema_email_pass = z.object({
        email: z.string().trim().min(1, {
            message: 'Vui lòng nhập email',
        }).email({
            message: 'Email không đúng định dạng',
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

    const form_email_pass = useForm<z.infer<typeof schema_email_pass>>({
        resolver: zodResolver(schema_email_pass),
        defaultValues: {
            email: "",
        },
    })
    function onSubmitEmailPass(values: z.infer<typeof schema_email_pass>) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        console.log(values);

    }
    return (
        <Form {...form_email_pass}>
            <form onSubmit={form_email_pass.handleSubmit(onSubmitEmailPass)}>
                <div className="grid gap-2">
                    <FormField
                        control={form_email_pass.control}
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
                        control={form_email_pass.control}
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
                        control={form_email_pass.control}
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
    )

}