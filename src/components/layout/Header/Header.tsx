import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Icons } from "@/components/ui/icons";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Show } from "@/components/utility/Show";
import { cn, getLSData } from "@/lib/utils";

import { NavMenu } from "./Nav-Menu"
import { SignInSignUp } from "./SignInSignUp"
import { UserNav } from "./UserDropDown"
import { useTheme } from "@/components/themes/theme-provider";
import { useScreenDetector } from "@/hook/useScreenDetector";

export function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [isDarkTheme, setIsDarkTheme] = useState(false);
    const { isMobile } = useScreenDetector();
    const { theme } = useTheme();


    useEffect(() => {
        if (getLSData('access_token')) {
            setIsAuth(true);
        }
    }, []);
    useEffect(() => {
        if (theme === "system") {
            setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches);
        } else {
            setIsDarkTheme(theme === "dark");
        }
    }, [theme])
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-primary-900">
            <div className="block md:hidden">
                <Sheet>
                    <SheetTrigger className="flex items-center justify-center">
                        <Menu className="w-6 h-6" /><Icons.app className="ml-2 h-9 w-9" style={isDarkTheme ? { fill: "white" } : {}} />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                        <NavMenu className="flex flex-col items-center" />
                    </SheetContent>
                </Sheet>
            </div>
            <h2 className="items-center hidden text-2xl font-bold tracking-tight md:flex"><Icons.app className="mr-2 h-9 w-9" style={isDarkTheme ? { fill: "white" } : {}} />Hòa Lạc House</h2>
            <NavMenu className="hidden mr-11 md:block" />
            <Show>
                <Show.When isTrue={isAuth}>
                    <UserNav className={cn("p-3 ml-32", isMobile && 'pr-0')} />
                </Show.When>
                <Show.When isTrue={!isAuth}>
                    <SignInSignUp />
                </Show.When>
            </Show>
        </div>
    )
}