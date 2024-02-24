import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/themes/theme-provider"
import { auth } from "@/lib/firebase"
import { useEffect, useState } from "react"
import { getLSData, removeLSData } from "@/lib/utils"
import { User } from "@/types"
import { NavLink } from "react-router-dom"
interface UserNavProps {
    className?: string
}
export function UserNav({ className }: Readonly<UserNavProps>) {
    const { setTheme } = useTheme()
    const [user, setUser] = useState<User>(getLSData('user'));
    const handleLogout = () => {
        removeLSData('access_token');
        removeLSData('user');
        auth.signOut();
        window.location.href = '/';
    };
    useEffect(() => {
        setUser(getLSData('user'));
    }, [])
    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative w-8 h-8 rounded-full">
                        <Avatar className="w-8 h-8">
                            <AvatarImage src={user.photo ?? ""} />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user.display_name ?? "Người xa lạ"}</p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user.email ?? user.phone}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <NavLink to={'/chat'}>
                            <DropdownMenuItem>Chat</DropdownMenuItem>
                        </NavLink>
                        <DropdownMenuSeparator />
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                Theme
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem onClick={() => setTheme("light")}>
                                        Sáng
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                                        Tối
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setTheme("system")}>
                                        Hệ thống
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        Đăng xuất
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}