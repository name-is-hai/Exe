import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, } from "@/components/ui/card"

export const SkeletonCard = () => {
    return (
        <Card className="w-fit">
            <CardContent>
                <div className="mt-3 overflow-hidden rounded-lg">
                    <Skeleton className="h-[240px] md:h-[280px] md:w-[197px] w-[175px] rounded-xl" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                <Skeleton className="h-4 md:w-[190px] w-[150px]" />
                <Skeleton className="h-4 md:w-[140px] w-[100px]" />
                <Skeleton className="h-4 md:w-[100px] w-[50px]" />
            </CardFooter>
        </Card>
    )
}