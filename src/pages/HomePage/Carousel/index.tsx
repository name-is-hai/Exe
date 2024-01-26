
import { Img } from 'react-image';
import { Carousel, CarouselNext, CarouselPrevious, CarouselSlide, CarouselSlideList } from "@/components/ui/carousel-silder"
import useWindowDimensions from '@/hook/useWindowDimensions';
import CardSearch from '../CardSearch';
import {
    Drawer,
    DrawerContent,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from '@/components/ui/button';

export function CarouselDemo() {
    let real_width: number
    const { width } = useWindowDimensions();
    if (width >= 1400) {
        real_width = 1350;
    } else if (width < 1400 && width > 600) {
        real_width = 700;
    } else {
        real_width = 326;
    }

    let hight = 600
    const slides = [
        {
            src: `https://placehold.co/${real_width}x${hight}?text=1`,
            alt: `Placeholder 1`,
        },
        {
            src: `https://placehold.co/${real_width}x${hight}?text=2`,
            alt: `Placeholder 2`,
        },
        {
            src: `https://placehold.co/${real_width}x${hight}?text=3`,
            alt: `Placeholder 3`,
        },
        {
            src: `https://placehold.co/${real_width}x${hight}?text=4`,
            alt: `Placeholder 4`,
        },
        {
            src: `https://placehold.co/${real_width}x${hight}?text=5`,
            alt: `Placeholder 5`,
        },
        {
            src: `https://placehold.co/${real_width}x${hight}?text=6`,
            alt: `Placeholder 6`,
        }
    ]
    return (
        <div className="relative flex flex-col items-center justify-between">
            <Carousel>
                <div className="relative flex items-center justify-center">
                    <CarouselPrevious />
                    <CarouselSlideList className={`lg:w-[1350px] md:w-[${real_width}px]`}>
                        {slides.map(({ src, alt }, i) => (
                            <CarouselSlide key={i}>
                                <Img className='rounded-2xl'
                                    key={i}
                                    src={src}
                                    alt={alt}
                                    width={real_width}
                                    height={hight}
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