import { useEffect, useState } from "react";
import { NavMenu } from "./Nav-Menu"
import { SignInSignUp } from "./UserNav/SignInSignUp"
import { UserNav } from "./UserNav/UserDropdown"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Icons } from "@/components/ui/icons";

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
            <div className="block md:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center justify-center">
                        <Menu className="w-6 h-6" /><Icons.app className="w-10 h-10 ml-2" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <NavMenu className="flex flex-col items-center" />
                    </SheetContent>
                </Sheet>
            </div>
            <h2 className="items-center hidden text-2xl font-bold tracking-tight md:flex"><Icons.app className="mr-2 h-9 w-9" />Hòa Lạc House</h2>
            <NavMenu className="hidden mr-11 md:block" />
            {loading ? null : isAuth ? <UserNav className="p-3 ml-32" /> : <SignInSignUp />}
        </div>
    )
}