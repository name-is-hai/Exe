import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit';
import CardSearch from './card-search';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { useScreenDetector } from '@/hook/useScreenDetector';

interface CarouselRoomsProps {
  silder: any;
  real_width: number;
  height: number;
  sizeList: any[];
  warnList: any[];
  priceList: any[];
  findRoom: (value: any) => void;
}

const CarouselRooms = ({ silder, real_width, height, sizeList, warnList, priceList, findRoom }: CarouselRoomsProps) => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const { isMobile } = useScreenDetector();

  return (
    <Carousel
      plugins={[plugin.current]}
      className="rounded-2xl "
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      {!isMobile && <CarouselPrevious />}
      <CarouselContent className={`w-[${real_width}px]`}>
        {silder.map(({ src, alt }: any, index: any) => (
          <CarouselItem key={index}>
            <AsyncImage
              className="rounded-2xl"
              src={src}
              alt={alt}
              Transition={Blur}
              style={{ width: '100%', height: height, objectFit: 'cover' }}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {!isMobile && <CarouselNext />}
      <div className="hidden lg:-translate-x-1/2 lg:absolute md:block lg:top-3/4 lg:left-1/2">
        <CardSearch
          findRoom={findRoom}
          priceList={priceList}
          sizeList={sizeList}
          warnList={warnList}
          className="rounded-3xl"
        />
      </div>
      <div className="absolute block -translate-x-1/2 -translate-y-1/2 left-1/2 md:hidden">
        <Drawer shouldScaleBackground>
          <DrawerTrigger asChild>
            <Button
              className="rounded-full w-72"
              variant="outline"
            >
              Tìm Kiếm
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="w-full max-w-sm mx-auto">
              <CardSearch
                findRoom={findRoom}
                priceList={priceList}
                sizeList={sizeList}
                warnList={warnList}
                className="border-none"
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </Carousel>
  );
};

export { CarouselRooms };
