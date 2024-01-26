import { useState } from "react"

import { cn } from "@/lib/utils"
import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { FormEmailPassword } from "./form-email-pass";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUseEmail, setIsUseEmail] = useState<boolean>(false)

    const schema_email = z.object({
        email: z.string().trim().min(1, {
            message: 'Vui lòng nhập email',
        }).email({
            message: 'Email không đúng định dạng',
        })
    })

    const form_email = useForm<z.infer<typeof schema_email>>({
        resolver: zodResolver(schema_email),
        defaultValues: {
            email: "",
        },
    })

    function onSubmitEmail(values: z.infer<typeof schema_email>) {
        setIsLoading(true)

        setTimeout(() => {
            setIsLoading(false)
            setIsUseEmail(true)
        }, 3000)
        console.log(values);

    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <div hidden={isUseEmail}>
                <Form {...form_email}>
                    <form onSubmit={form_email.handleSubmit(onSubmitEmail)}>
                        <div className="grid gap-2">
                            <div>
                                <FormField
                                    control={form_email.control}
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
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Đăng ký bằng email
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div hidden={!isUseEmail}>
                <FormEmailPassword />
            </div>
            <div className={cn("relative", isUseEmail && "hidden")}>
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="px-2 bg-background text-muted-foreground">
                        Hoặc tiếp tục với
                    </span>
                </div>
            </div>
            <Button variant="outline" type="button" className={cn(isUseEmail && "hidden")} disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Icons.phone className="w-5 h-5 mr-2" />
                )}{" "}
                Số điện thoại
            </Button>
            <Button variant="outline" type="button" className={cn(isUseEmail && "hidden")} disabled={isLoading}>
                {isLoading ? (
                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                    <Icons.google className="w-4 h-4 mr-2" />
                )}{" "}
                Tài khoản Google
            </Button>
            <Button variant="outline" type="button" className={cn(isUseEmail && "hidden")} disabled={isLoading}>
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