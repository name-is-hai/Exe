import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Page from "@/components/layout/page"
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import http from "@/utils/http";
import RoomCard from "./RoomCard";
import { FilterCard } from "./FilterCard";
import { useScreenDetector } from "@/hook/useScreenDetector";
import { Show } from "@/components/utility/Show";
import { Separator } from "@/components/ui/separator";

const RoomPage = () => {
    const [formData, setFormData] = useState({
        startPrice: 1000000,
        endPrice: 9000000,
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
            const newValue = type === 'checkbox' ? checked : name === 'endPrice' || name === 'startPrice' ? Number(value.replace(/\D/g, "")) : value;
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: newValue
            }));
        } else if (Array.isArray(event)) {
            const [startPrice, endPrice] = event;
            setFormData(prevFormData => ({
                ...prevFormData,
                startPrice: Number(startPrice),
                endPrice: Number(endPrice)
            }));
        }
        else {
            setFormData(prevFormData => ({
                ...prevFormData,
                size: event
            }));
        }

        if (isMobile && Array.isArray(event)) {
            setTimeout(() => {
                setIsSheetOpen(false)
            }, 1000);
        } else if (isMobile) {
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
                                <Button variant={"outline"}><Filter className="w-6 h-6" />Tìm kiếm</Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <div>
                                    <div className="space-y-4">
                                        <FilterCard isMobile={isMobile} handleChange={handleChange} formData={formData} />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:block">
                        <div className="px-10 space-y-4">
                            <FilterCard isMobile={isMobile} handleChange={handleChange} formData={formData} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Show>
                                <Show.When isTrue={rooms.length}>
                                    {rooms.map((room: any, index: any) => (
                                        <NavLink key={index} to={`/room-detail?id=${room.alt}`}>
                                            <RoomCard key={index} room={room} height={100} width={400} aspectRatio="square" />
                                        </NavLink>
                                    ))}
                                </Show.When>
                                <Show.Else>
                                    <h4 className="text-sm font-medium leading-none text-center">Không tìm thấy phòng trọ nào</h4>
                                    <Separator />
                                </Show.Else>
                            </Show>
                        </div>
                    </div>
                </div>
            </Container>
        </Page >
    );
};

export default RoomPage