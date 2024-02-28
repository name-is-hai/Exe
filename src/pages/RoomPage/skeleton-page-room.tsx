import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card";

export const SkeletonPageRoom = () => {
    return (
        <Card className="md:w-96">
            <CardContent className="flex items-center justify-start p-3 space-x-4">
                <div className="overflow-hidden rounded-lg">
                    <Skeleton className="w-32 h-24" />
                </div>
                <div className="flex flex-col items-start space-y-2">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-44" />
                    <Skeleton className="h-5 w-44" />
                </div>
            </CardContent>
        </Card>
    )
}