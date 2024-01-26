import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Search } from "lucide-react"

type CardSearchProps = {
    className?: string
}
export default function CardSearch({ className }: Readonly<CardSearchProps>) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>
                    Tìm kiếm thông tin căn hộ
                </CardTitle>
            </CardHeader>
            <div className="flex flex-col md:flex-row">
                <CardContent>
                    <CardDescription className="mb-4">
                        Khu vực tìm kiếm
                    </CardDescription>
                    <Select>
                        <SelectTrigger className="w-[230px]">
                            <SelectValue placeholder="Tìm kiếm theo khu vực" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Khu Vực</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardContent>
                    <CardDescription className="mb-4">
                        Số lượng người
                    </CardDescription>
                    <Select>
                        <SelectTrigger className="w-[230px]">
                            <SelectValue placeholder="Tìm kiếm theo số người" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                <SelectLabel>Số người</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardContent>
                    <CardDescription className="mb-4">
                        Khoảng Giá
                    </CardDescription>
                    <Select>
                        <SelectTrigger className="w-[230px]">
                            <SelectValue placeholder="Tìm kiếm theo khoảng giá" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Giá</SelectLabel>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                                <SelectItem value="blueberry">Blueberry</SelectItem>
                                <SelectItem value="grapes">Grapes</SelectItem>
                                <SelectItem value="pineapple">Pineapple</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardContent>
                    <Button><Search className="me-4" /> Tìm Kiếm</Button>
                </CardContent>
            </div>
        </Card>
    )
}