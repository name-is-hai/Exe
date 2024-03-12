import { NavLink } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { RoomElement } from './room';
import { useScreenDetector } from '@/hook/useScreenDetector';
import { Show } from '@/components/utility/Show';
import { SkeletonCard } from './skeleton-card';
interface TopRoomProps {
  rooms: any;
  isLoading: boolean;
}
const TopRoom = ({ rooms, isLoading }: TopRoomProps) => {
  const { isMobile } = useScreenDetector();
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-[300px] md:w-[1300px] mx-auto"
    >
      {!isMobile && <CarouselPrevious />}
      <CarouselContent>
        <Show>
          <Show.When isTrue={!isLoading}>
            {rooms.map((room: any, index: any) => (
              <CarouselItem
                key={index}
                className="md:basis-1/5 basis-3/4"
              >
                <div
                  onClick={() => {
                    window.location.href = `/room-detail?id=${room.alt}`;
                  }}
                >
                  <RoomElement
                    room={room}
                    aspectRatio="portrait"
                  />
                </div>
              </CarouselItem>
            ))}
          </Show.When>
          <Show.Else>
            {Array(6)
              .fill('')
              .map((_, index: any) => (
                <CarouselItem
                  key={index}
                  className="md:basis-1/5 basis-3/4"
                >
                  <SkeletonCard />
                </CarouselItem>
              ))}
          </Show.Else>
        </Show>
      </CarouselContent>
      {!isMobile && <CarouselNext />}
    </Carousel>
  );
};

export { TopRoom };
