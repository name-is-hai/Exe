import { Filter, Tags } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Page from "@/components/layout/page"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Container from "@/components/ui/container";
import { HoverCard, HoverCardArrow, HoverCardContent, HoverCardPortal, HoverCardTrigger } from "@/components/ui/hover-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import http from "@/utils/http";

import RoomCard from "./RoomCard";
import { FilterCard } from "./FilterCard";
import { useScreenDetector } from "@/hook/useScreenDetector";

const RoomPage = () => {
    const [formData, setFormData] = useState({
        startPrice: 0,
        endPrice: 0,
        size: '0',
    });
    const [rooms, setRooms] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { isMobile } = useScreenDetector();

    useEffect(() => {

        const body = {
            startPrice: formData.startPrice,
            endPrice: formData.endPrice,
            startSize: 0,
            endSize: 0
        }

        if (formData.size === '1') {
            body.endSize = 10
        } else if (formData.size === '2') {
            body.startSize = 21
            body.endSize = 30
        } else if (formData.size === '3') {
            body.startSize = 31
        }

        http.post('/exe/rooms/get-list', body, false).then((res) => {
            const images: any = []
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

        if (isMobile) {
            setIsSheetOpen(false)
        }

    };

    return (
        <Page>
            <Container className="lg:px-14">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="block md:hidden">
                        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                            <SheetTrigger asChild>
                                <Button variant={"outline"}><Filter className="w-6 h-6" /> Filter</Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div>
                                    <div className="space-y-4">
                                        <FilterCard handleChange={handleChange} formData={formData} />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:block">
                        <div className="px-10 space-y-4">
                            <FilterCard handleChange={handleChange} formData={formData} />
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