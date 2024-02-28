import { Card, CardContent, CardDescription, CardFooter, } from "@/components/ui/card";
import RatingStar from "@/components/ui/rating";
import { cn, numberCurrencyFormat } from "@/lib/utils";
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit'

interface RoomElementProps extends React.HTMLAttributes<HTMLDivElement> {
    room: any
    aspectRatio?: "portrait" | "square"
}
export function RoomElement({
    room,
    aspectRatio = "portrait",
}: Readonly<RoomElementProps>) {

    return (
        <Card className="w-fit">
            <CardContent>
                <div className="mt-3 overflow-hidden rounded-lg">
                    <AsyncImage
                        className={cn(
                            "object-cover transition-all hover:scale-110",
                            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                        )}
                        Transition={Blur}
                        src={room.src}
                    />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <div>{room.name}</div>
                <CardDescription className="flex flex-row">
                    <span>Giá chỉ từ :  <data className="text-orange-400" value="100.00">{numberCurrencyFormat(room.price)}</data></span>
                    <div className="flex flex-row items-center ms-6">
                        <RatingStar isEdit={false} size={13} value={4} />
                    </div>
                </CardDescription>
            </CardFooter>
        </Card>
    )
}