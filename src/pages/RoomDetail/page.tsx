import Page from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import Container from "@/components/ui/container";
import RatingStar from "@/components/ui/rating";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@/hook/useQuery";
import useWindowDimensions from "@/hook/useWindowDimensions";
import { getLSData, numberFormat } from '@/lib/utils';
import http from "@/utils/http";
import { MessageCircleDashed } from "lucide-react";
import { useEffect, useState } from "react";
import { Img } from "react-image";
import TopRoom from "../components/TopRoom";

export function RoomDetail() {
    const query = useQuery();

    const [rooms, setRooms] = useState([]);
    const [room, setRoom] = useState<any>();
    useEffect(() => {
        http.post('/exe/rooms/get-list', {}, false).then((res) => {
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

        http.post('/exe/rooms/detail', { id: parseInt(query.get('id') || '') }, false).then((res) => {
            setRoom(res.resp?.data)
        })
    }, [query]);

    let real_width: number
    let real_height: number
    const { width } = useWindowDimensions();
    if (width >= 1400) {
        real_width = 600;
        real_height = 400;
    } else if (width < 1400 && width > 600) {
        real_width = 400;
        real_height = 400;
    } else {
        real_width = 326;
        real_height = 100;
    }

    return (
        <Page>
            <Container>
                <div className="flex flex-col md:justify-around md:pb-20 md:flex-row">
                    <div className="relative mt-11">
                        <Img src={room?.image} width={real_width} height={400} className="rounded-xl" />
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="absolute -translate-x-1/2 -translate-y-1/2 mx-w-sm top-5/6 left-1/2"
                        >
                            <CarouselContent>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
                                        <div className="m-1">
                                            <Card>
                                                <CardContent className="flex items-center justify-center p-1">
                                                    <Img src={room?.image} width={100} height={real_height} />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="mt-11 md:ms-32">
                        <div>
                            <div className="text-sm text-muted-foreground">
                                Mô tả qua về phòng trọ
                            </div>
                            <h2 className="mt-2 text-3xl font-semibold leading-none">{room?.name}</h2>
                            <Separator className="my-4" />
                            <div className="flex items-center h-5 text-sm space-x-7">
                                <div className="text-sm font-medium leading-none">Chỉ Từ: {numberFormat(room?.price)} / Tháng</div>
                                <Separator orientation="vertical" />
                                <div className="flex items-center space-x-3 text-sm font-medium leading-none">
                                    <RatingStar isEdit={false} size={15} value={4} />
                                    <div>4.3</div>
                                    <Button onClick={() => {
                                        if (getLSData('user')) {
                                            window.location.href = `/chat?room=${btoa(encodeURIComponent(JSON.stringify(room?.host)))}`
                                        } else {
                                            window.location.href = `/signin`
                                        }
                                    }} className="rounded-full" size="icon"><MessageCircleDashed /></Button>
                                </div>
                            </div>
                            <div className="mt-5 text-sm text-muted-foreground md:w-[500px]">
                                {room?.description}
                            </div>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Có thể bạn sẽ hứng thú</h1>
                <TopRoom rooms={rooms} />
            </Container>
        </Page >
    )
}