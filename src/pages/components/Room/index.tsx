import { Img } from "react-image"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
} from "@/components/ui/card"
import RatingStar from "@/components/ui/rating";
import { cn } from "@/lib/utils"
import { numberFormat } from "@/lib/utils";

interface RoomElementProps extends React.HTMLAttributes<HTMLDivElement> {
    room: any
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}
export function RoomElement({
    room,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: Readonly<RoomElementProps>) {

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <Card className="w-fit">
                <CardContent>
                    <div className="mt-3 overflow-hidden rounded-lg">
                        <Img src={room.src}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-110",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )} />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start">
                    <div>{room.name}</div>
                    <CardDescription className="flex flex-row">
                        <span>Giá chỉ từ :  <data className="text-orange-400" value="100.00">{numberFormat(room.price)}</data></span>
                        <div className="flex flex-row items-center ms-6">
                            <RatingStar isEdit={false} size={13} value={4} />
                        </div>
                    </CardDescription>
                </CardFooter>
            </Card>
        </div >
    )
}