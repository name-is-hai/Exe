import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn, getLSData, setLSData } from "@/lib/utils";
import { ChatSidebar } from "./chat-sidebar";
import { Chat } from "./chat";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { fireStore } from "@/lib/firebase";
import { userData } from "../data";
import useQuery from "@/hook/useQuery";
import { User, UserMessage } from "@/types";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}: Readonly<ChatLayoutProps>) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [selectedUser, setSelectedUser] = React.useState<UserMessage>({
    uid: "", name: "", avatar: '', messages: []
  });
  const [message, setMessages] = React.useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const queryParam = useQuery();


  useEffect(() => {
    const user = getLSData('user') as User;
    const q = query(
      collection(fireStore, 'messages', user.uid, queryParam.get('uid') ?? user.uid))
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => a.created_at - b.created_at
      );
      sortedMessages.forEach(mess => {
        mess.name = user.display_name ?? user.phone;
        mess.avatar = mess.avatar ?? 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png';
      })
      let selectedUser: UserMessage = {
        uid: 'oRfd3rovwoNjgQLEojtiuipG1Ih1',
        avatar: 'https://shadcn-chat.vercel.app/User1.png',
        name: 'Trọ Nga Hoàng',
        messages: sortedMessages
      }
      setSelectedUser(selectedUser)
      setMessages(sortedMessages);
      return () => unsubscribe;
    })
  }, [])

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const getUser = (user) => {
    setSelectedUser(user)
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        setLSData('react-resizable-panels:layout', sizes);
      }}
      className="items-stretch h-full"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          setLSData('react-resizable-panels:collapsed', true);
        }}
        onExpand={() => {
          setIsCollapsed(false);
          setLSData('react-resizable-panels:collapsed', false);
        }}
        className={cn(
          isCollapsed && "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <ScrollArea className="h-[40rem]">
          <ChatSidebar
            isCollapsed={isCollapsed || isMobile}
            links={userData.map((user) => ({
              name: user.name,
              messages: message ?? [],
              avatar: user.avatar,
              variant: selectedUser.name === user.name ? "secondary" : "ghost",
            }))}
            isMobile={isMobile}
          />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <ScrollArea className="h-[40rem]">
          <Chat
            messages={message}
            selectedUser={selectedUser}
            isMobile={isMobile}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
