import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { Show } from "@/components/utility/Show";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { MessageSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
interface SidebarProps {
  isCollapsed: boolean;
  links: {
    name: string;
    messages: Message[];
    avatar: string;
    variant: "secondary" | "ghost";
  }[];
  isMobile: boolean;
}

export function ChatSidebar({ links, isCollapsed, isMobile }: Readonly<SidebarProps>) {

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      <div className={cn("flex items-center justify-between px-1 border-b", isMobile ? "py-5" : "py-3 pb-5")}>
        <div className="flex items-center gap-2 text-2xl">
          <Show>
            <Show.When isTrue={isMobile}>
              <MessageSquare />
            </Show.When>
            <Show.Else><p className="font-medium">Chats</p></Show.Else>
          </Show>
        </div>
      </div>
      <nav className="grid gap-1 ps-0 pe-2 group-[[data-collapsed=true]]:justify-start group-[[data-collapsed=true]]:pe-2 group-[[data-collapsed=true]]:ps-0">
        {links.map((link, index) =>
          <Show key={index} >
            <Show.When isTrue={isCollapsed || isMobile}>
              <TooltipProvider key={index}>
                <Tooltip key={index} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <NavLink
                      onClick={() => window.location.href = '/chat?uid=K46iAaLqPsYkAjTXW80RItov4Hq2'}
                      to="#"
                      className={cn(
                        buttonVariants({ variant: link.variant, size: "icon" }),
                        "h-9 w-11 md:h-16 md:w-16",
                        link.variant === "secondary" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <Avatar className="flex items-center justify-center">
                        <AvatarImage
                          src={link.avatar}
                          alt={link.avatar}
                          width={6}
                          height={6}
                          className="h-9 w-9 "
                        />
                      </Avatar>{" "}
                      <span className="sr-only">{link.name}</span>
                    </NavLink>
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
              <NavLink
                onClick={() => window.location.href = '/chat?uid=K46iAaLqPsYkAjTXW80RItov4Hq2'}
                key={index}
                to="#"
                className={cn(
                  buttonVariants({ variant: link.variant, size: "lg" }),
                  link.variant === "secondary" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white shrink",
                  "justify-start gap-4"
                )}
              >
                <Avatar className="flex items-center justify-center">
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
                  {link.messages.length > 0 && (
                    <span className="text-xs truncate text-zinc-300 ">
                      {link.messages[link.messages.length - 1].name.split(" ")[0]}
                      : {link.messages[link.messages.length - 1].message}
                    </span>
                  )}
                </div>
              </NavLink>
            </Show.Else>
          </Show>
        )}
      </nav>
    </div>
  );
}
