import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Show } from '@/components/utility/Show';
import { cn } from '@/lib/utils';
import { UserMessage } from '@/types';
import { MessageSquare } from 'lucide-react';
interface SidebarProps {
  isCollapsed: boolean;
  links: {
    uid: string;
    name: string;
    avatar: string;
    lastMessage: { name: string; text: string };
    variant: 'secondary' | 'ghost';
  }[];
  onClick?: (selectedUser: UserMessage) => void;
  isMobile: boolean;
}

export function ChatSidebar({ links, isCollapsed, isMobile, onClick }: Readonly<SidebarProps>) {
  return (
    <div className="relative flex flex-col h-full gap-4 p-2 group">
      <div className={cn('flex items-center justify-between px-1 border-b', isMobile ? 'py-5' : 'py-3 pb-5')}>
        <div className="flex items-center gap-2 text-2xl">
          <Show>
            <Show.When isTrue={isMobile}>
              <MessageSquare />
            </Show.When>
            <Show.Else>
              <p className="font-medium">Chats</p>
            </Show.Else>
          </Show>
        </div>
      </div>
      <div className="grid gap-1 ps-0 pe-2">
        {links.map((link, index) => (
          <Show key={index}>
            <Show.When isTrue={isCollapsed || isMobile}>
              <TooltipProvider key={index}>
                <Tooltip
                  key={index}
                  delayDuration={0}
                >
                  <TooltipTrigger asChild>
                    <Button
                      variant={link.variant}
                      size={'icon'}
                      onClick={() => onClick(link)}
                      className={'h-11 w-11 md:h-13 md:w-16'}
                    >
                      <Avatar className="flex items-center justify-center">
                        <AvatarImage
                          src={link.avatar}
                          alt={link.avatar}
                          width={6}
                          height={6}
                          className="w-10 h-10"
                        />
                      </Avatar>
                      <span className="sr-only">{link.name}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {link.name}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Show.When>
            <Show.Else>
              <Button
                variant={link.variant}
                size={'lg'}
                onClick={() => onClick(link)}
                key={index}
                className={'justify-start gap-x-4'}
              >
                <Avatar className="flex items-center justify-start">
                  <AvatarImage
                    src={link.avatar}
                    alt={link.avatar}
                    width={6}
                    height={6}
                    className="w-10 h-10 "
                  />
                </Avatar>
                <div className="flex flex-col max-w-28">
                  <span>{link.name}</span>
                  {link.lastMessage && (
                    <span className="text-xs text-left truncate text-zinc-300 ">
                      {link.lastMessage.name.split(' ')[0]}: {link.lastMessage.text}
                    </span>
                  )}
                </div>
              </Button>
            </Show.Else>
          </Show>
        ))}
      </div>
    </div>
  );
}
