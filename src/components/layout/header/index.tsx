import { useEffect, useState } from "react";
import { NavMenu } from "./Nav-Menu"
import { SignInSignUp } from "./UserNav/SignInSignUp"
import { UserNav } from "./UserNav/UserDropdown"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import MenuLink from "./Nav-Menu/MenuLink";
import { NavLink } from "react-router-dom";

export function Header() {
    const [isAuth, setIsAuth] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('user_token');
        if (storedToken) {
            setIsAuth(storedToken);
        }
        setLoading(false);
    }, []);
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-primary-900">
            <div className="flex items-center md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="w-6 h-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <NavMenu className="flex flex-col items-center" />
                    </SheetContent>
                </Sheet>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Finance Dashboard</h2>
            <NavMenu className="hidden mr-11 md:block" />
            {loading ? null : isAuth ? <UserNav className="p-3 ml-32" /> : <SignInSignUp />}
        </div>
    )
}