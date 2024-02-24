import {
    Card,
    CardContent,
    CardDescription,
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
import { Search } from "lucide-react"

type CardSearchProps = {
    className?: string,
    sizeList: any[],
    warnList: any[],
    priceList: any[],
}
export default function CardSearch({ className, sizeList, warnList, priceList }: Readonly<CardSearchProps>) {
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
                                {warnList.map((item: any, index) => (
                                    <SelectItem key={index} value={item.ward_id}>{item.ward_name}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardContent>
                    <CardDescription className="mb-4">
                        Diện tích tìm kiếm
                    </CardDescription>
                    <Select>
                        <SelectTrigger className="w-[230px]">
                            <SelectValue placeholder="Tìm kiếm theo diện tích" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup >
                                <SelectLabel>Diện tích</SelectLabel>
                                {sizeList.map((item: any, index) => (
                                    <SelectItem key={index} value={item.value}>{item.title}&nbsp;(&nbsp;<sub>m<sup>2</sup></sub>)</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </CardContent>
                <CardContent>
                    <CardDescription className="mb-4">
                        Khoảng giá tìm kiếm
                    </CardDescription>
                    <Select>
                        <SelectTrigger className="w-[230px]">
                            <SelectValue placeholder="Tìm kiếm theo khoảng giá" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Giá</SelectLabel>
                                {priceList.map((item: any, index) => (
                                    <SelectItem key={index} value={item.value}>{item.title}</SelectItem>
                                ))}
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