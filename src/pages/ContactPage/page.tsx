import Page from "@/components/layout/page"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Show } from "@/components/utility/Show"
import http from "@/utils/http"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    const schema_contact = z.object({
        message: z.string().trim().min(1, {
            message: 'Hãy điền thông điệp của bạn',
        }),
        name: z.string().trim().min(1, {
            message: 'Hãy điền tên của bạn',
        }),
        info: z.string().trim().refine((value) => {
            const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
            if (phoneRegex.test(value)) {
                return true;
            }
            try {
                z.string().email().parse(value);
                return true;
            } catch (error) {
                return false;
            }
        }, {
            message: 'Vui lòng nhập thông tin liên lạc hợp lệ (Số điện thoại hoặc Email)',
        })
    })

    const form_contact = useForm<z.infer<typeof schema_contact>>({
        resolver: zodResolver(schema_contact),
        defaultValues: {
            name: "",
            message: "",
            info: "",
        },
    })

    function onSubmitContact(data: z.infer<typeof schema_contact>) {
        setIsLoading(true)
        http.post('/exe/feed-back', data).then(res => {
            if (res.resp) {
                setOpenDialog(true)
                setIsLoading(false)
            }
        }).catch(err => {
            console.error("Không gửi được feedback", err);
        })
    }

    return (
        <Page>
            <Container className="py-24 lg:px-32">
                <div key="1" className="p-4 space-y-8 border-2 border-gray-300 rounded-md shadow-md dark:border-gray-700">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Liên hệ với chúng tôi</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Vui lòng điền vào mẫu dưới đây và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <Form {...form_contact}>
                            <form onSubmit={form_contact.handleSubmit(onSubmitContact)}>
                                <div className="grid gap-2">
                                    <div className="space-y-2">
                                        <FormField
                                            control={form_contact.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Tên của bạn</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Hãy điền tên của bạn" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form_contact.control}
                                            name="info"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Thông tin cá nhân</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Hãy điền số điện thoại hoặc email của bạn" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <FormField
                                            control={form_contact.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Thông điệp</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Hãy điền thông điệp bạn muốn gửi đến chúng tôi." {...field} rows={5} className="resize-none" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button className="w-full text-black bg-gray-300 dark:bg-gray-700 dark:text-white" disabled={isLoading}>
                                        <Show>
                                            <Show.When isTrue={isLoading}>
                                                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                                            </Show.When>
                                        </Show>
                                        Gửi
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
                <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-center">Thông điệp đã được gửi</DialogTitle>
                            <DialogDescription className="text-center">
                                Rất cảm ơn những đóng góp của bạn cho chúng tôi.
                            </DialogDescription>
                        </DialogHeader>
                        <iframe src="https://giphy.com/embed/osjgQPWRx3cac" className="w-full h-full pointer-events-none" ></iframe>
                    </DialogContent>
                </Dialog>
            </Container>
        </Page>
    )
}

export default ContactPage