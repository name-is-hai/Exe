import Page from "@/components/layout"
import Container from "@/components/ui/container";
import CarouselRooms from "./Carousel";
import TopRoom from "./TopRoom";
import useWindowDimensions from "@/hook/useWindowDimensions";

const HomePage = () => {
    const { width } = useWindowDimensions();
    let real_width: number;
    let height: number = 600;
    if (width >= 1400) {
        real_width = 1350;
    } else if (width < 1400 && width > 600) {
        real_width = 700;
    } else {
        real_width = 326;
    }

    const rooms = [
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
        {
            src: "https://placehold.co/300x400",
        },
    ]

    const slides = [
        {
            src: `https://placehold.co/${real_width}x${height}?text=1`,
            alt: `Placeholder 1`,
        },
        {
            src: `https://placehold.co/${real_width}x${height}?text=2`,
            alt: `Placeholder 2`,
        },
        {
            src: `https://placehold.co/${real_width}x${height}?text=3`,
            alt: `Placeholder 3`,
        },
        {
            src: `https://placehold.co/${real_width}x${height}?text=4`,
            alt: `Placeholder 4`,
        },
        {
            src: `https://placehold.co/${real_width}x${height}?text=5`,
            alt: `Placeholder 5`,
        },
        {
            src: `https://placehold.co/${real_width}x${height}?text=6`,
            alt: `Placeholder 6`,
        }
    ]
    return (
        <Page>
            <Container className="lg:px-14">
                <CarouselRooms silder={slides} height={height} real_width={real_width} />
                <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Top recommend phòng trọ</h1>
                <TopRoom rooms={rooms} />
            </Container>
        </Page>
    );
};

export default HomePage