import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MenuLinkProps {
    name: string;
    href: string;
}

const MenuLink = ({ name, href }: MenuLinkProps) => {
    const router = useLocation();
    const isRouteActive = router.pathname === href;

    return (
        <NavLink
            to={href}
            className={cn(
                'm-3 py-2 px-4 hover:border-b-2 hover:border-foreground',
                { 'border-b-2 border-foreground text-foreground': isRouteActive },
                { 'text-muted-foreground': !isRouteActive }
            )}
        >
            <span className="text-sm font-medium transition-colors hover:text-foreground">
                <span>
                    {name}
                </span>
            </span>
        </NavLink >
    );
};

export default MenuLink;