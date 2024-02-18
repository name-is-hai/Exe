import Page from "@/components/layout"
import Container from "@/components/ui/container"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"


const ContactPage = () => {
    return (
        <Page>
            <Container className="py-24 lg:px-32">
                helooo
                {/* <div key="1" className="p-4 space-y-8 border-2 border-gray-300 rounded-md shadow-md dark:border-gray-700">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">Liên hệ với chúng tôi</h2>
                        <p className="text-gray-500 dark:text-gray-400">
                            Vui lòng điền vào mẫu dưới đây và chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="name">
                                Tên
                            </Label>
                            <Input
                                className="bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                                id="name"
                                placeholder="Enter your name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="phone">
                                Số điện thoại
                            </Label>
                            <Input
                                className="bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-800"
                                id="phone"
                                placeholder="Hãy điền số điện thoại của bạn"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="message">
                                Message
                            </Label>
                            <Textarea placeholder="Hãy điền thông điệp bạn muốn gửi đến chúng tôi." rows={5} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox className="text-gray-600 dark:text-gray-400" id="agreement" required />
                            <Label className="text-sm font-normal text-gray-600 dark:text-gray-400" htmlFor="agreement">
                                I agree to the
                                <button className="text-gray-600 underline underline-offset-2 dark:text-gray-400">
                                    Terms & Conditions
                                </button>
                            </Label>
                        </div>
                        <Button className="w-full text-black bg-gray-300 dark:bg-gray-700 dark:text-white" type="submit">
                            Submit
                        </Button>
                    </div>
                </div> */}
            </Container>
        </Page>
    )
}

export default ContactPage