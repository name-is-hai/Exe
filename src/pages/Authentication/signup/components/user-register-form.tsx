import { useState } from "react"
import { toast } from 'sonner'
import { cn } from "@/lib/utils"
import { z } from 'zod';
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { FormPhonePassword } from "./form-phone-pass";
import http from "@/utils/http";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserRegisterForm({ className, ...props }: UserAuthFormProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isUsePhone, setIsUsePhone] = useState<boolean>(false)

    const schema_phone = z.object({
        phone: z.string().trim()
            .min(1, {
                message: 'Vui lòng nhập số điện thoại',
            }).max(11, { message: 'Số điện thoại không đúng định dạng', })
            .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
                message: 'Số điện thoại không đúng định dạng',
            }),
    })

    const form_phone = useForm<z.infer<typeof schema_phone>>({
        resolver: zodResolver(schema_phone),
        defaultValues: {
            phone: "",
        },
    })

    function onSubmitPhone(values: z.infer<typeof schema_phone>) {
        setIsLoading(true)
        http.post('/exe/users/phone-check', values, false).then((res) => {
            if (!res.resp.code) {
                toast.warning(res.resp.message, { position: "top-right" });
                setIsLoading(false)
            } else {
                setIsUsePhone(true)
            }
        }).catch(err => {
            setIsLoading(false)
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau');
        });
    }

    return (
        <div className={cn("grid gap-6 mx-2", className)} {...props}>
            <div hidden={isUsePhone}>
                <Form {...form_phone}>
                    <form onSubmit={form_phone.handleSubmit(onSubmitPhone)}>
                        <div className="grid gap-2">
                            <div>
                                <FormField
                                    control={form_phone.control}
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
                            </div>
                            <Button disabled={isLoading}>
                                {isLoading && (
                                    <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                Đăng ký bằng số điện thoại
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
            <div hidden={!isUsePhone}>
                <FormPhonePassword phone={form_phone.getValues('phone')} />
            </div>
        </div>
    );
}