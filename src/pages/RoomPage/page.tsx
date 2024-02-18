import Page from "@/components/layout"
import Container from "@/components/ui/container";
import RoomCard from "./RoomCard";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HoverCard, HoverCardTrigger, HoverCardContent, HoverCardPortal, HoverCardArrow } from "@/components/ui/hover-card";
import { Tags, Filter } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import http from "@/utils/http";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const RoomPage = () => {
    const [formData, setFormData] = useState({
        startPrice: 0,
        endPrice: 0,
        size: '0',
    });
    const [rooms, setRooms] = useState([]);
    useEffect(() => {

        let body = {
            startPrice: formData.startPrice,
            endPrice: formData.endPrice,
            startSize: 0,
            endSize: 0
        }

        console.log(formData);
        if (formData.size === '1') {
            body.endSize = 10
        } else if (formData.size === '2') {
            body.startSize = 21
            body.endSize = 30
        } else if (formData.size === '3') {
            body.startSize = 31
        }

        http.post('/exe/rooms/get-list', body, false).then((res) => {
            var images: any = []
            res.resp?.data.list.forEach((room: any) => {
                images.push({
                    name: room.name,
                    price: room.price,
                    src: room.image,
                    alt: room.id
                })
            });
            setRooms(images);
        });

    }, [formData]);

    const handleChange = (event: any) => {
        if (event.target) {
            const { name, value, type, checked } = event.target;
            const newValue = type === 'checkbox' ? checked : value;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: newValue
            }));
        } else {
            setFormData(prevFormData => ({
                ...prevFormData,
                size: event
            }));
        }

    };

    return (
        <Page>
            <Container className="lg:px-14">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="block md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant={"outline"}><Filter className="w-6 h-6" /> Filter</Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div>
                                    <div className="space-y-4">
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
                                                    <Input name="startPrice" type="number" value={formData.startPrice}
                                                        onChange={handleChange} className="h-6" />
                                                </div>
                                                <div className="flex justify-center gap-4">
                                                    <div>Đến:</div>
                                                    <Input name="endPrice" type="number" value={formData.endPrice}
                                                        onChange={handleChange} className="h-6" />
                                                </div>
                                            </CardContent>
                                        </Card>
                                        <Card>
                                            <CardHeader>
                                                <div className="text-sm font-medium">Diện tích:</div>
                                            </CardHeader>
                                            <CardContent className="grid grid-cols-2 gap-4">
                                                <RadioGroup name="size" defaultValue={formData.size} onValueChange={handleChange}>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="1" id="r1" />
                                                        <Label className="font-normal" htmlFor="r1">Nhỏ hơn&nbsp;&nbsp;20<sub>M<sup>2</sup></sub></Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="2" id="r2" checked={formData.size === '2'} />
                                                        <Label className="font-normal" htmlFor="r2">Từ:&nbsp;&nbsp;21<sub>M<sup>2</sup></sub>&nbsp;&nbsp;&nbsp;&nbsp;Đến:&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="3" id="r3" checked={formData.size === '3'} />
                                                        <Label className="font-normal" htmlFor="r3">Lớn hơn&nbsp;&nbsp;30<sub>M<sup>2</sup></sub></Label>
                                                    </div>
                                                </RadioGroup>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:block">
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
                                        <Input name="startPrice" type="number" value={formData.startPrice}
                                            onChange={handleChange} className="h-6" />
                                    </div>
                                    <div className="flex justify-center gap-4">
                                        <div>Đến:</div>
                                        <Input name="endPrice" type="number" value={formData.endPrice}
                                            onChange={handleChange} className="h-6" />
                                    </div>
                                </CardContent>
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
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {rooms.map((room: any, index: any) => (
                                <NavLink key={index} to={`/room-detail?id=${room.alt}`}>
                                    <RoomCard key={index} room={room} height={100} width={400} aspectRatio="square" />
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </Page >
    );
};

export default RoomPage