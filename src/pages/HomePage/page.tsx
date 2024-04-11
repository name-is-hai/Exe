import Page from '@/components/layout/page';
import Container from '@/components/ui/container';
import { usePost } from '@/hook/useApi';
import useWindowDimensions from '@/hook/useWindowDimensions';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { TopRoom } from '../components/top-room';
import { CarouselRooms } from './carousel';

const HomePage = () => {
  const { data, error, isLoading } = usePost(['roomlist'], '/exe/rooms/get-list');
  const {
    data: wards,
    error: errorWards,
    isLoading: isLoadingWards,
  } = useQuery({
    queryKey: ['ward'],
    queryFn: async () => {
      try {
        const respone = await fetch('https://vapi.vnappmob.com/api/province/ward/276');
        return respone.json();
      } catch (error) {
        throw new Error('Failed to fetch ward');
      }
    },
  });

  if (error || errorWards) {
    toast.error('Something went wrong and we are fixing it, please come back later!', {
      position: 'bottom-center',
    });
  }

  const findRoom = (value: any) => {
    const search = {};
    const priceMappings = {
      '1': [1000000, 2000000],
      '2': [2000000, 3000000],
      '3': [3000000, 4000000],
      '4': [4000000, 10000000],
    };
    if (priceMappings.hasOwnProperty(value.price)) {
      value.price = priceMappings[value.price];
    }
    for (const property in value) {
      if (value[property]) {
        search[property] = value[property];
      }
    }
    window.location.href = `/room?search=${btoa(JSON.stringify(search))}`;
  };

  const clearWards = (data) => {
    let ward = [];
    if (!isLoadingWards) {
      ward = data.results;
    }
    return ward;
  };
  const clearTopRooms = (data) => {
    const images: any = [];
    if (!isLoading) {
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
  const clearTopSize = (data) => {
    const images: any = [];
    if (!isLoading) {
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

  const sizeList = [
    { title: 'Dưới 20', value: '1' },
    { title: 'Từ 20-30', value: '2' },
    { title: 'Trên 30', value: '3' },
  ];
  const priceList = [
    { title: 'Dưới 2 triệu', value: '1' },
    { title: 'Từ 2 triệu đến 3 triệu', value: '2' },
    { title: 'Từ 3 triệu đến 4 triệu', value: '3' },
    { title: 'Trên 4 triệu', value: '4' },
  ];

  const { width } = useWindowDimensions();
  let real_width: number;
  const height: number = 600;
  if (width >= 1400) {
    real_width = 1350;
  } else if (width < 1400 && width > 600) {
    real_width = 700;
  } else {
    real_width = 326;
  }

  const slides = [
    {
      src: 'https://exe-api.nameishai.id.vn/img/ROOM/1/hoang1.jpg',
      alt: 'Placeholder 1',
    },
    {
      src: 'https://exe-api.nameishai.id.vn/img/ROOM/3/House3.jpg',
      alt: 'Placeholder 2',
    },
  ];
  return (
    <Page>
      <Container className="lg:px-14">
        <CarouselRooms
          findRoom={findRoom}
          priceList={priceList}
          sizeList={sizeList}
          warnList={clearWards(wards)}
          silder={slides}
          height={height}
          real_width={real_width}
        />
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Top recommend phòng trọ</h1>
        <TopRoom
          rooms={clearTopRooms(data)}
          isLoading={isLoading}
        />
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">
          Top phòng trọ có giá rẻ nhất
        </h1>
        <TopRoom
          rooms={clearTopSize(data)}
          isLoading={isLoading}
        />
      </Container>
    </Page>
  );
};

export default HomePage;
