import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Img } from "react-image";
import RatingStar from "@/components/ui/rating";

interface RoomCardProps extends React.HTMLAttributes<HTMLDivElement> {
    room: any
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}
const RoomCard = ({
    room,
    aspectRatio,
    width,
    height,
    className,
    ...props
}: Readonly<RoomCardProps>) => {
    return (
        <>
            <Card className="md:w-96">
                <CardContent className="flex items-center justify-start space-x-4">
                    <div className="mt-3 overflow-hidden rounded-lg">
                        <Img src={room.src}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-110",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )} />
                    </div>
                    <div className="flex flex-col items-start space-y-2">
                        <div>Tên phòng trọ</div>
                        <div className="flex flex-col space-y-2">
                            <span>Giá:  <data className="text-orange-400" value="100.00">1,000,000đ</data></span>
                            <div className="flex flex-row items-center">
                                <RatingStar isEdit={false} size={13} value={4} />
                            </div>
                        </div>
                    </div>
                </CardContent>

            </Card>
        </>
    );
}

export default RoomCard;