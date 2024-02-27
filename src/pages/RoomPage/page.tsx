import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Page from "@/components/layout/page"
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import http from "@/utils/http";
import RoomCard from "./room-card";
import { FilterCard } from "./filter-card";
import { useScreenDetector } from "@/hook/useScreenDetector";
import { Show } from "@/components/utility/Show";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@/hook/useQuery";
import { ScrollArea } from "@/components/ui/scroll-area";

const RoomPage = () => {
    const query = useQuery()
    let searchparams;
    if (query.get('search')) searchparams = JSON.parse(atob(query.get('search')))
    const [formData, setFormData] = useState({
        startPrice: searchparams?.price ? searchparams.price[0] : 1000000,
        endPrice: searchparams?.price ? searchparams.price[1] : 9000000,
        size: searchparams?.size ? searchparams.size : '0',
        ward: searchparams?.ward ? searchparams.ward : "",
    });
    const [rooms, setRooms] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const { isMobile } = useScreenDetector();
    const [warnList, setWarnList] = useState([]);

    useEffect(() => {
        fetch('https://vapi.vnappmob.com/api/province/ward/276').then(res => res.json()).then(res => {
            setWarnList(res.results)
        })
    }, []);
    useEffect(() => {

        const body = {
            startPrice: formData.startPrice,
            endPrice: formData.endPrice,
            startSize: 0,
            endSize: 0,
            ward: formData.ward
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
            // setRooms([...images, ...images, ...images, ...images]);
        });

    }, [formData]);

    const handleChange = (event: any) => {
        console.log(event);

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
        } else if (event.length === 5) {
            setFormData(prevFormData => ({
                ...prevFormData,
                ward: event,
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
                                        <FilterCard warnList={warnList} isMobile={isMobile} handleChange={handleChange} formData={formData} />
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                    <div className="hidden md:block">
                        <div className="px-10 space-y-4">
                            <FilterCard warnList={warnList} isMobile={isMobile} handleChange={handleChange} formData={formData} />
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <ScrollArea className="h-screen" type="scroll">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <Show>
                                    <Show.When isTrue={rooms.length}>
                                        {rooms.map((room: any, index: any) => (
                                            <NavLink key={index} to={`/room-detail?id=${room.alt}`}>
                                                <RoomCard key={index} room={room} width={100} aspectRatio="square" />
                                            </NavLink>
                                        ))}

                                    </Show.When>
                                    <Show.Else>
                                        <h4 className="text-sm font-medium leading-none text-center">Không tìm thấy phòng trọ nào</h4>
                                        <Separator />
                                    </Show.Else>
                                </Show>
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </Container>
        </Page >
    );
};

export default RoomPage