import Page from "@/components/layout"
import Container from "@/components/ui/container";
import RoomCard from "./RoomCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal, HoverCardArrow } from "@/components/ui/hover-card";
import { Tags } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RoomPage = () => {
    return (
        <Page>
            <Container className="lg:px-14">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="px-10 space-y-4">
                            <HoverCard openDelay={300}>
                                <HoverCardTrigger asChild>
                                    <Card>
                                        <CardContent className="p-2 text-center bg-sky-100">
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
                                        <div>Từ:</div>
                                        <Input type="number" className="h-6" />
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <div>Đến:</div>
                                        <Input type="number" className="h-6" />
                                    </div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <div className="text-sm font-medium">Diện tích:</div>
                                </CardHeader>
                                <CardContent className="grid grid-cols-2 gap-4">
                                    <RadioGroup>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="14-20" id="r1" />
                                            <Label className="font-normal" htmlFor="r1">Nhỏ hơn&nbsp;&nbsp;20<sub>M<sup>2</sup></sub></Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="comfortable" id="r2" />
                                            <Label className="font-normal" htmlFor="r2">Từ:&nbsp;&nbsp;21<sub>M<sup>2</sup></sub>&nbsp;&nbsp;&nbsp;&nbsp;Đến:&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="compact" id="r3" />
                                            <Label className="font-normal" htmlFor="r3">Lớn hơn&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                                        </div>
                                    </RadioGroup>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                    <div className="col-span-2">
                        hellop
                    </div>
                </div>
            </Container>
        </Page >
    );
};

export default RoomPage