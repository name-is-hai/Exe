import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Drawer, DrawerContent, DrawerTrigger, } from "@/components/ui/drawer";
import { Img } from 'react-image';
import CardSearch from '../CardSearch';
import Autoplay from "embla-carousel-autoplay"
import { useEffect, useRef, useState } from 'react';

interface CarouselRoomsProps {
    silder: any
    real_width: number
    height: number
    sizeList: any[]
    warnList: any[]
    priceList: any[]
}

const CarouselRooms = ({ silder, real_width, height, sizeList, warnList, priceList }: CarouselRoomsProps) => {
    const plugin = useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
    )
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        checkScreenWidth();
        window.addEventListener("resize", checkScreenWidth);
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);
    return (
        <div className="relative flex flex-col items-center justify-between">
            <Carousel plugins={[plugin.current]}
                className="rounded-2xl "
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}>
                <div className={`lg:w-[1350px] md:w-[${real_width}px]`} >
                    {!isMobile && <CarouselPrevious />}
                    <CarouselContent>
                        {silder.map(({ src, alt }: any, index: any) => (
                            <CarouselItem key={index}>
                                <Img className='rounded-2xl'
                                    key={index}
                                    src={src}
                                    alt={alt}
                                    style={{ width: '100%', height: height, objectFit: 'cover' }}
                                />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    {!isMobile && <CarouselNext />}
                </div>
                <div className='hidden lg:-translate-x-1/2 lg:absolute md:block lg:top-3/4 lg:left-1/2'>
                    <CardSearch priceList={priceList} sizeList={sizeList} warnList={warnList} className='rounded-3xl' />
                </div>
                <div className='absolute block -translate-x-1/2 -translate-y-1/2 left-1/2 md:hidden'>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button className='rounded-full w-72' variant="outline">
                                Tìm Kiếm
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <CardSearch priceList={priceList} sizeList={sizeList} warnList={warnList} className='border-none' />
                        </DrawerContent>
                    </Drawer>
                </div>
            </Carousel >
        </div >
    );
}

export default CarouselRooms