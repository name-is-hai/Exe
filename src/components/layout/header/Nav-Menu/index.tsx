import { cn } from "@/lib/utils";
import MenuLink from "./MenuLink";

interface NavMenuProps {
    className?: string;
}


export const NavMenu = ({ className }: NavMenuProps) => {
    return (<nav className={cn("space-x-4 lg:space-x-6", className)}>
        <MenuLink name="Home" href="/" />
        <MenuLink name="Service" href="/service" />
        <MenuLink name="Property" href="/property" />
        <MenuLink name="Contact" href="/contact" />
    </nav>)
}

