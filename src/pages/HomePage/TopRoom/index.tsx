import { RoomElement } from "./Room"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { NavLink } from "react-router-dom"
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
                            <NavLink to={`/room-detail?id=${room.alt}`}>
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