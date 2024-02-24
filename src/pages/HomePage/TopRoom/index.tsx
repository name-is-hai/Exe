import { NavLink } from "react-router-dom"

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import { RoomElement } from "./Room"
interface TopRoomProps {
    rooms: any;
}

const TopRoom = ({ rooms }: TopRoomProps) => {
    return (
        <Carousel opts={{
            align: "start",
        }}
            className="w-[300px] md:w-[1300px] mx-auto"
        >
            <CarouselPrevious />
            <CarouselContent>
                {rooms.map((room: any, index: any) => (
                    <CarouselItem key={index} className="md:basis-1/5 basis-3/4">
                        <div className="m-1">
                            <NavLink onClick={() => { window.location.href = `/room-detail?id=${room.alt}` }} to={''}>
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