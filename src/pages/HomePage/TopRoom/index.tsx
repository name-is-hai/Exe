import { Separator } from "@/components/ui/separator"
import { RoomElement } from "./Room"
import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { NavLink } from "react-router-dom"

const TopRoom = () => {
    const rooms = [
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
    ]
    return (
        <Carousel opts={{
            align: "start",
        }}
            className="w-[300px] md:w-[1300px] mx-auto"
        >
            <CarouselPrevious />
            <CarouselContent>
                {rooms.map((room, index) => (
                    <CarouselItem key={index} className="md:basis-1/5 basis-1/2">
                        <div className="m-1">
                            <NavLink to={"/room-detail"}>
                                <RoomElement room={room} aspectRatio="portrait" className="md:w-[250px] w-[150px]"
                                />
                            </NavLink>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselNext />
        </Carousel>
    )
}

export default TopRoom