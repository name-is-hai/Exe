import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useQuery } from "@/hook/useQuery";
import { fireStore } from "@/lib/firebase";
import { cn, getLSData, setLSData } from "@/lib/utils";
import { Message, QueryChatsResp, User, UserMessage } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { collection, getDocs, onSnapshot, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { userData } from "../data";
import { Chat } from "./chat";
import { ChatSidebar } from "./chat-sidebar";
import { getCurrentUser } from "@/services/authen.service";
import { sendDocMessage, getDocsChats, setQueryChats, subscribeToQueryChats, updateDocsMessage, setDocsChats, setQueryUserChats, subscribeToQueryUserChats } from "@/services/firebase.service";

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
  const [listChats, setListChats] = React.useState<QueryChatsResp[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<UserMessage>({
    uid: 'K46iAaLqPsYkAjTXW80RItov4Hq2',
    avatar: 'https://lh3.googleusercontent.com/a/ACg8ocKOQF42k5Bp0-uJrFzlLgnE7vVrI4qfQy1e_3a5qpdS_Q=s96-c',
    name: 'Trọ Nga Hoàng'
  });
  const [message, setMessages] = React.useState([]);
  const [isMobile, setIsMobile] = useState(false);

  const user = getCurrentUser();
  const queryParam = useQuery();

  const sendMessage = async (newMessage: Message) => {
    try {
      await sendDocMessage([user.uid, queryParam.get('uid') ?? user.uid], newMessage)
    } catch (error) {
      console.log(error);
    }
  };

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
  useEffect(() => {
    const unsubscribe = subscribeToQueryChats(setQueryChats([user.uid, queryParam.get('uid') ?? user.uid]), (data) => {
      const sortedMessages = data.sort(
        (a, b) => a.created_at - b.created_at
      );
      setMessages(sortedMessages);
    })
    return () => {
      unsubscribe();
    };
  }, [selectedUser.uid])

  useEffect(() => {
    const unsubscribe = subscribeToQueryUserChats(setQueryUserChats([user.uid]), (data) => {
      setListChats(data)
    })
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

  useEffect(() => {
    const combinedId = user.uid > selectedUser.uid ? user.uid + selectedUser.uid : selectedUser.uid + user.uid
    getDocsChats([combinedId]).then(res => {
      if (!res.exists()) {
        let currentUser: UserMessage = { uid: user.uid, name: user.display_name ?? user.phone, avatar: user.photo ?? 'https://shadcn-chat.vercel.app/User1.png' }
        setDocsChats([combinedId], { message: [] })
        updateDocsMessage(combinedId, currentUser, selectedUser)
        updateDocsMessage(combinedId, selectedUser, currentUser)
      }
    }).catch(err => {
      console.log(err);
    })
  }, [selectedUser])

  const getUser = (user) => {
    setSelectedUser(user)
    console.log(user);
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
            links={listChats.map((user) => ({
              uid: user.userInfo.uid,
              name: user.userInfo.name,
              messages: message ?? [],
              avatar: user.userInfo.avatar,
              variant: selectedUser.name === user.userInfo.name ? "secondary" : "ghost",
            }))}
            onClick={getUser}
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
            sendMessage={sendMessage}
            isMobile={isMobile}
          />
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
