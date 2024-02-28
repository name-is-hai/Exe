import { Card, CardContent } from "@/components/ui/card";
import RatingStar from "@/components/ui/rating";
import { cn, numberCurrencyFormat } from "@/lib/utils";
import { Blur } from "transitions-kit";
import { AsyncImage } from "loadable-image";

interface RoomCardProps extends React.HTMLAttributes<HTMLDivElement> {
    room: any
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}
const RoomCard = ({
    room,
    aspectRatio = "square",
}: Readonly<RoomCardProps>) => {
    return (
        <Card className="md:w-96">
            <CardContent className="flex items-center justify-start p-3 space-x-4">
                <div className="overflow-hidden rounded-lg">
                    <AsyncImage
                        className={cn(
                            "object-cover transition-all hover:scale-110",
                            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                        )}
                        style={{ width: '120px', height: '100px' }}
                        Transition={Blur}
                        src={room.src}
                    />
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <div>{room.name}</div>
                    <div className="flex flex-col space-y-2">
                        <span>Giá chỉ từ:  <data className="text-orange-400" value="100.00">{numberCurrencyFormat(room.price)}</data></span>
                        <div className="flex flex-row items-center">
                            <RatingStar isEdit={false} size={13} value={4} />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default RoomCard;