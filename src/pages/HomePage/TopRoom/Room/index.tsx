import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Img } from "react-image"
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
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    )
}