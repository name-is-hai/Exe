
import { Card, CardContent } from "@/components/ui/card"
import { Img } from 'react-image';

import {
    Carousel,
    CarouselNext,
    CarouselPrevious,
    CarouselSlide,
    CarouselSlideList,
} from "@/components/ui/carousel-silder"

const slides = Array.from({ length: 6 }).map((_, i) => ({
    src: `https://placehold.co/${500}x${400}?text=${i + 1}`,
    alt: `Placeholder ${i + 1}`,
}));
export function CarouselDemo() {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24`}
        >
            <Carousel>
                <div className="relative flex items-center justify-center">
                    <CarouselPrevious />
                    <CarouselSlideList className="lg:w-[1080px] md:w-[500px]">
                        {slides.map(({ src, alt }, i) => (
                            <CarouselSlide key={i}>
                                <Img
                                    src={src}
                                    alt={alt}
                                    width={500}
                                    height={400}
                                />
                            </CarouselSlide>
                        ))}
                    </CarouselSlideList>
                    <CarouselNext />
                </div>
            </Carousel>
        </main>
    );
}