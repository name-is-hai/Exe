import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

export const SkeletonRoomDetail = () => {
    return (
        <>
            <Skeleton className="h-[20px] w-40" />
            <Skeleton className="w-56 h-[30px]" />
            <Skeleton className="w-32 h-[20px]" />
            <Separator className="my-4" />
            <div className="flex items-center h-5 space-x-7">
                <Skeleton className="h-full w-44" />
                <Separator orientation="vertical" />
                <div className="flex items-center space-x-3 text-sm">
                    <Skeleton className="w-32 h-[20px]" />
                    <Skeleton className="w-10 h-10 rounded-full" />
                </div>
            </div>
            <div className="mt-5 text-sm text-muted-foreground md:w-[500px]">
                <Skeleton className="w-full h-[300px]" />
            </div>
        </>
    )
}