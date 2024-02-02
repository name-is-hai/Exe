import { Img } from 'react-image';
import { Carousel, CarouselNext, CarouselPrevious, CarouselSlide, CarouselSlideList } from "@/components/ui/carousel-silder"
import CardSearch from '../CardSearch';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';
interface CarouselRoomsProps {
    silder: any
    real_width: number
    height: number
}

const CarouselRooms = ({ silder, real_width, height }: CarouselRoomsProps) => {
    return (
        <div className="relative flex flex-col items-center justify-between">
            <Carousel>
                <div className="relative flex items-center justify-center">
                    <CarouselPrevious />
                    <CarouselSlideList className={`lg:w-[1350px] md:w-[${real_width}px] rounded-2xl`}>
                        {silder.map(({ src, alt }: any, i: any) => (
                            <CarouselSlide key={i}>
                                <Img
                                    key={i}
                                    src={src}
                                    alt={alt}
                                    style={{ width: '100%', height: height }}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselSlideList>
                    <CarouselNext />
                </div>
                <div className='hidden lg:-translate-y-1/2 lg:-translate-x-1/2 lg:absolute md:block lg:top-3/4 lg:left-1/2'>
                    <CardSearch className='rounded-3xl' />
                </div>
                <div className='absolute block -translate-x-1/2 -translate-y-1/2 left-1/2 md:hidden'>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className='rounded-full w-72' variant="outline">
                                Tìm Kiếm
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <CardSearch />
                        </DrawerContent>
                    </Drawer>
                </div>
            </Carousel >
        </div >
    );
}

export default CarouselRooms