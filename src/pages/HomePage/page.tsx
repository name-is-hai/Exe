import Page from "@/components/layout";
import Container from "@/components/ui/container";
import useWindowDimensions from "@/hook/useWindowDimensions";
import http from "@/utils/http";
import { useEffect, useState } from "react";
import CarouselRooms from "./Carousel";
import TopRoom from "./TopRoom";

const HomePage = () => {

    const [rooms, setRooms] = useState([]);
    const [roomsTopSize, setRoomsTopSize] = useState([]);
    const [warnList, setWarnList] = useState([]);

    useEffect(() => {
        http.post('/exe/rooms/get-list', {}, false).then((res) => {
            const images: any = []
            const imagesTopsize: any = []
            res.resp?.data.list.forEach((room: any) => {
                images.push({
                    name: room.name,
                    price: room.price,
                    src: room.image,
                    alt: room.id
                })
            });
            res.resp?.data.list.sort((a: any, b: any) => a.price - b.price).forEach((room: any) => {
                imagesTopsize.push({
                    name: room.name,
                    price: room.price,
                    src: room.image,
                    alt: room.id
                })
            })
            setRooms(images);
            setRoomsTopSize(imagesTopsize)
        });
    }, []);

    useEffect(() => {
        fetch('https://vapi.vnappmob.com/api/province/ward/276').then(res => res.json()).then(res => {
            setWarnList(res.results)
        })
    }, []);

    const sizeList = [
        { title: 'Dưới 20', value: '20' },
        { title: 'Từ 20-30', value: '20-30' },
        { title: 'Trên 30', value: '30' },
    ]
    const priceList = [
        { title: 'Dưới 2 triệu', value: '2' },
        { title: 'Từ 2 triệu đến 3 triệu', value: '2-3' },
        { title: 'Từ 3 triệu đến 4 triệu', value: '3-4' },
        { title: 'Trên 4 triệu', value: '4' },
    ]

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
            src: `https://firebasestorage.googleapis.com/v0/b/exe-final.appspot.com/o/boarding-houses%2Fimage%2F7_1706809901189.jpg?alt=media&token=6fbbc037-81f8-4f8a-aae2-e976166866f3`,
            alt: `Placeholder 1`,
        },
        {
            src: `https://firebasestorage.googleapis.com/v0/b/exe-final.appspot.com/o/boarding-houses%2Fimage%2F7_1706810025561.jpg?alt=media&token=87aed554-4ec9-4990-8ae3-e26f04886bf6`,
            alt: `Placeholder 2`,
        },
    ]
    return (
        <Page>
            <Container className="lg:px-14">
                <CarouselRooms priceList={priceList} sizeList={sizeList} warnList={warnList} silder={slides} height={height} real_width={real_width} />
                <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Top recommend phòng trọ</h1>
                <TopRoom rooms={rooms} />
                <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Top phòng trọ có giá rẻ nhất</h1>
                <TopRoom rooms={roomsTopSize} />
            </Container>
        </Page>
    );
};

export default HomePage