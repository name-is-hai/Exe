import { MenuNavigation } from "./menu-nav"
import { UserNav } from "./user-nav"
import Container from "@/components/ui/container"

export function Header() {
    return (<Container>
        <div className="flex items-center justify-between">
            <MenuNavigation />
            <UserNav />
        </div>
    </ Container>)
}