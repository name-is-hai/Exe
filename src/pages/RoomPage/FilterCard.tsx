import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { InputCurrency } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { HoverCard, HoverCardTrigger, HoverCardPortal, HoverCardContent, HoverCardArrow } from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Tags } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { Show } from "@/components/utility/Show"
import { numberCurrencyFormat } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useState } from "react"
interface FilterCardProps {
    formData: any
    isMobile: boolean,
    handleChange: (event: any) => void
}
export const FilterCard = ({ formData, isMobile, handleChange }: FilterCardProps) => {
    const [openPopOver, setOpenPopOver] = useState(false);
    const [currentValue, setCurrentValue] = useState([formData.startPrice, formData.endPrice]);
    function sliderPriceChange(value: number[]): void {
        setCurrentValue(value);
        setOpenPopOver(true)
    }

    return (
        <>
            <HoverCard openDelay={300}>
                <HoverCardTrigger asChild>
                    <Card>
                        <CardContent className="p-2 text-center bg-sky-100 dark:bg-slate-800">
                            <div className="flex items-center justify-center space-x-2">
                                <Tags /><div className="text-sm font-medium">Chúng Tôi Luôn Khớp Giá!</div>
                            </div>
                        </CardContent>
                    </Card>
                </HoverCardTrigger>
                <HoverCardPortal>
                    <HoverCardContent className="w-80">
                        <HoverCardArrow />
                        <div className="text-sm font-medium text-green-800">Chúng Tôi Luôn Khớp Giá!</div>
                        <div className="flex space-x-2">
                            <Tags className="text-green-800" />
                            <div className="w-80">
                                <div className="text-sm text-pretty">
                                    Không tính phí đặt phòng • Tìm được giá chênh lệch? Chúng tôi sẽ hoàn lại số tiền chênh lệch!
                                </div>
                            </div>
                        </div>
                    </HoverCardContent>
                </HoverCardPortal>
            </HoverCard>
            <Card>
                <CardHeader>
                    <div className="text-sm font-medium">Khoảng giá:</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <div className="flex justify-center gap-4">
                        <Show>
                            <Show.When isTrue={isMobile}>
                                <div className="text-sm font-medium"> {numberCurrencyFormat(formData.startPrice)}</div>
                            </Show.When>
                            <Show.Else>
                                <div>Từ:</div>
                                <InputCurrency name="startPrice" intlConfig={{ locale: 'vi-VN', currency: 'VND' }} value={formData.startPrice} onChange={handleChange} className="h-6" />
                            </Show.Else>
                        </Show>
                    </div>
                    <div className="flex justify-center gap-4">
                        <Show>
                            <Show.When isTrue={isMobile}>
                                <div className="text-sm font-medium"> {numberCurrencyFormat(formData.endPrice)}</div>
                            </Show.When>
                            <Show.Else>
                                <div>Đến:</div>
                                <InputCurrency name="endPrice" intlConfig={{ locale: 'vi-VN', currency: 'VND' }} value={formData.endPrice} onChange={handleChange} className="h-6" />
                            </Show.Else>
                        </Show>
                    </div>
                </CardContent>
                <CardFooter>
                    <Popover open={openPopOver} onOpenChange={setOpenPopOver}>
                        <PopoverContent side={"top"} className="text-center">
                            Từ: {numberCurrencyFormat(currentValue[0])}{" - "}Đến: {numberCurrencyFormat(currentValue[1])}
                        </PopoverContent>
                        <PopoverTrigger asChild>
                            <Slider className="w-full" min={1000000} onValueChange={sliderPriceChange} onValueCommit={handleChange}
                                max={10000000} defaultValue={[formData.startPrice, formData.endPrice]} minStepsBetweenThumbs={100000} />
                        </PopoverTrigger>
                    </Popover>
                </CardFooter>
            </Card>
            <Card>
                <CardHeader>
                    <div className="text-sm font-medium">Diện tích:</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                    <RadioGroup defaultValue={formData.size} onValueChange={handleChange}>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1" id="r1" />
                            <Label className="font-normal" htmlFor="r1">Nhỏ hơn&nbsp;&nbsp;20<sub>M<sup>2</sup></sub></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="2" id="r2" />
                            <Label className="font-normal" htmlFor="r2">Từ:&nbsp;&nbsp;21<sub>M<sup>2</sup></sub>&nbsp;&nbsp;&nbsp;&nbsp;Đến:&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="r3" />
                            <Label className="font-normal" htmlFor="r3">Lớn hơn&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </>
    )
}