import Page from "@/components/layout"
import Container from "@/components/ui/container";
import { CarouselDemo } from "./Carousel";
import TopRoom from "./TopRoom";

const HomePage = () => {
    return (
        <Page>
            <Container className="lg:px-14">
                <CarouselDemo />
                <h1 className="text-2xl font-semibold leading-none tracking-tight text-center my-9">Top recommend phòng trọ</h1>
                <TopRoom />
            </Container>
        </Page>
    );
};

export default HomePage