import * as React from "react"

import { cn } from "@/lib/utils"
import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

const schema = z.object({
    email: z.string().trim().min(1, {
        message: 'Vui lòng nhập email',
    }).email({
        message: 'Email không đúng định dạng',
    }),
    password: z.string().trim().min(1, {
        message: 'Vui lòng nhập mật khẩu',
    })
});

export type FormUserAuth = z.infer<typeof schema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<FormUserAuth>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(values: FormUserAuth) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
        }, 3000)
        console.log(values);

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <FormField
                            control={form.control}
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
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mật khẩu</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="***********" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-sm" />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isLoading}>
                            {isLoading && (
                                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                            )}
                            Đăng ký bằng email
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
            <Button variant="outline" type="button" disabled={isLoading}>
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
        </div>
    )
}