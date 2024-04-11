import Page from '@/components/layout/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Container from '@/components/ui/container';
import RatingStar from '@/components/ui/rating';
import { Separator } from '@/components/ui/separator';
import { Show } from '@/components/utility/Show';
import { usePost } from '@/hook/useApi';
import { useQueryParams } from '@/hook/useQuery';
import useWindowDimensions from '@/hook/useWindowDimensions';
import { getLSData, numberCurrencyFormat } from '@/lib/utils';
import { AsyncImage } from 'loadable-image';
import { MapPinned, MessageCircleDashed } from 'lucide-react';
import { toast } from 'sonner';
import { Blur } from 'transitions-kit';
import { TopRoom } from '../components/top-room';
import { SkeletonRoomDetail } from './skeleton-room-detail';

export function RoomDetail() {
  const query = useQueryParams();
  const { width } = useWindowDimensions();
  const {
    data: rooms,
    error: errorRooms,
    isLoading: isLoadingRooms,
  } = usePost(['roomlist', query.get('id')], '/exe/rooms/get-list');
  const {
    data: room,
    error: errorRoom,
    isLoading: isLoadingRoom,
  } = usePost(['roomdetail', query.get('id')], '/exe/rooms/detail', { id: parseInt(query.get('id') || '') });

  if (errorRooms || errorRoom) {
    toast.error('Something went wrong and we are fixing it, please come back later!', {
      position: 'bottom-center',
    });
  }
  const clearRooms = (data) => {
    const images: any = [];
    if (!isLoadingRooms) {
      data.data.list.forEach((room: any) => {
        images.push({
          name: room.boarding_houses.name,
          price: room.price,
          src: room.image,
          alt: room.id,
        });
      });
    }
    return images;
  };

  let real_width: number;
  if (width >= 1400) {
    real_width = 600;
  } else if (width < 1400 && width > 600) {
    real_width = 400;
  } else {
    real_width = 326;
  }

  return (
    <Page>
      <Container>
        <div className="flex flex-col md:justify-around md:pb-20 md:flex-row">
          <div className="relative mt-11">
            <AsyncImage
              className="rounded-2xl"
              src={room?.data.image}
              alt={room?.data.name}
              style={{ width: real_width, height: '400px' }}
              Transition={Blur}
            />
            <Carousel
              opts={{
                align: 'start',
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 mx-w-sm top-5/6 left-1/2"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="w-9 basis-1/2 md:basis-1/3 md:w-14"
                  >
                    <Card>
                      <CardContent className="flex items-center justify-center p-1">
                        <AsyncImage
                          src={room?.data.image}
                          alt={room?.data.name}
                          Transition={Blur}
                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
          <div className="mt-11 md:ms-32">
            <div>
              <Show>
                <Show.When isTrue={isLoadingRoom}>
                  <SkeletonRoomDetail />
                </Show.When>
                <Show.Else>
                  <div className="text-sm text-muted-foreground">Mô tả qua về phòng trọ</div>
                  <h2 className="mt-2 text-3xl font-semibold leading-none">{room?.data.name}</h2>
                  <h2 className="flex items-center mt-2 text-sm font-medium leading-none">
                    <MapPinned className="w-5 h-5" />
                    {room?.data.address}
                  </h2>
                  <Separator className="my-4" />
                  <div className="flex items-center h-5 text-sm space-x-7">
                    <div className="text-sm font-medium leading-none">
                      Chỉ Từ: {numberCurrencyFormat(room?.data.price)} / Tháng
                    </div>
                    <Separator orientation="vertical" />
                    <div className="flex items-center space-x-3 text-sm font-medium leading-none">
                      <RatingStar
                        isEdit={false}
                        size={15}
                        value={4}
                      />
                      <div>4.3</div>
                      <Button
                        onClick={() => {
                          if (getLSData('user')) {
                            window.location.href = `/chat?room=${btoa(encodeURIComponent(JSON.stringify(room?.data.host)))}`;
                          } else {
                            window.location.href = '/signin';
                          }
                        }}
                        className="rounded-full"
                        size="icon"
                      >
                        <MessageCircleDashed />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-5 text-sm text-muted-foreground md:w-[500px]">{room?.data.description}</div>
                </Show.Else>
              </Show>
            </div>
          </div>
        </div>
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Có thể bạn sẽ hứng thú</h1>
        <TopRoom
          rooms={clearRooms(rooms)}
          isLoading={isLoadingRooms}
        />
      </Container>
    </Page>
  );
}
