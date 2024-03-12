import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useTheme } from '@/components/themes/theme-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getCurrentUser, logOut } from '@/services/authen.service';
import { User } from '@/types';
import { Check } from 'lucide-react';
import { useScreenDetector } from '@/hook/useScreenDetector';
interface UserNavProps {
  className?: string;
}
export function UserNav({ className }: Readonly<UserNavProps>) {
  const { setTheme, theme } = useTheme();
  const [user, setUser] = useState<User>(getCurrentUser());
  const { isMobile } = useScreenDetector();

  const handleLogout = () => {
    logOut();
    window.location.href = '/';
  };
  useEffect(() => {
    setUser(getCurrentUser());
  }, []);
  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative w-8 h-8 rounded-full"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={user.photo ?? ''} />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          align="start"
          forceMount
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.display_name ?? 'Người xa lạ'}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email ?? user.phone}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <NavLink to={'/chat'}>
              <DropdownMenuItem>Chat</DropdownMenuItem>
            </NavLink>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent sideOffset={isMobile && -120}>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'light'}
                    onClick={() => setTheme('light')}
                  >
                    Sáng
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'dark'}
                    onClick={() => setTheme('dark')}
                  >
                    Tối
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={theme === 'system'}
                    onClick={() => setTheme('system')}
                  >
                    Hệ thống
                  </DropdownMenuCheckboxItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
