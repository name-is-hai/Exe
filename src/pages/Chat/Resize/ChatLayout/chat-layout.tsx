import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useQuery } from "@/hook/useQuery";
import { fireStore } from "@/lib/firebase";
import { cn, getLSData, setLSData } from "@/lib/utils";
import { Message, QueryChatsResp, User, UserMessage } from "@/types";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { collection, getDocs, onSnapshot, query, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Chat } from "./chat";
import { ChatSidebar } from "./chat-sidebar";
import { getCurrentUser } from "@/services/authen.service";
import { sendDocMessage, getDocsChats, setQueryChats, subscribeToQueryChats, updateDocsUserChats, setDocsChats, setQueryUserChats, subscribeToQueryUserChats } from "@/services/firebase.service";
import { Show } from "@/components/utility/Show";
import { useScreenDetector } from "@/hook/useScreenDetector";

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
  const [selectedUser, setSelectedUser] = React.useState<UserMessage>();
  const [message, setMessages] = React.useState([]);
  const { isMobile } = useScreenDetector();

  const user = getCurrentUser();
  const queryParam = useQuery();

  //gửi tin nhắn
  const sendMessage = async (newMessage: Message) => {
    try {
      const combinedId = user.uid > selectedUser.uid ? user.uid + selectedUser.uid : selectedUser.uid + user.uid
      await sendDocMessage([combinedId], newMessage)
      const text = newMessage.message;
      const name = user.display_name;
      await updateDocsUserChats(combinedId, user.uid, {
        [combinedId + ".lastMessage"]: {
          text,
          name,
        },
        [combinedId + ".date"]: serverTimestamp(),
      })
      await updateDocsUserChats(combinedId, selectedUser.uid, {
        [combinedId + ".lastMessage"]: {
          text,
          name,
        },
        [combinedId + ".date"]: serverTimestamp(),
      })
    } catch (error) {
      console.log(error);
    }
  };

  //lấy người dùng từ url
  useEffect(() => {
    if (queryParam.get('room')) {
      let select = JSON.parse(decodeURIComponent(atob(queryParam.get('room'))));
      select.avatar = select.avatar ?? 'https://media.istockphoto.com/id/961516280/vector/house-flat-icon.jpg?s=612x612&w=0&k=20&c=KsZmFORfrbq5i3cSrCfm3do88Q-0MWw5kjYEg1JSszg='
      setSelectedUser(select);
      console.log(select);

    }
  }, [queryParam.get('room')])

  //kiểm tra xem người dùng hiện tại và người dùng được chọn có tồn tại chat không
  useEffect(() => {
    if (selectedUser) {
      const combinedId = user.uid > selectedUser.uid ? user.uid + selectedUser.uid : selectedUser.uid + user.uid
      getDocsChats([combinedId]).then(res => {
        if (!res.exists()) {
          let currentUser: UserMessage = { uid: user.uid, name: user.display_name ?? user.phone, avatar: user.photo ?? 'https://shadcn-chat.vercel.app/User1.png' }
          setDocsChats([combinedId], { message: [] })
          updateDocsUserChats(combinedId, currentUser.uid, {
            [combinedId + ".userInfo"]: {
              uid: selectedUser.uid,
              name: selectedUser.name,
              avatar: selectedUser.avatar,
            },
            [combinedId + ".date"]: serverTimestamp(),
          })
          updateDocsUserChats(combinedId, selectedUser.uid, {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              name: currentUser.name,
              avatar: currentUser.avatar,
            },
            [combinedId + ".date"]: serverTimestamp(),
          })
        }
      }).catch(err => {
        console.log(err);
      })
    }
  }, [selectedUser?.uid])

  //Lấy tin nhắn của người được trọn với người dùng hiện tại
  useEffect(() => {
    if (selectedUser) {
      const combinedId = user.uid > selectedUser.uid ? user.uid + selectedUser.uid : selectedUser.uid + user.uid
      const unsubscribe = subscribeToQueryChats(setQueryChats([combinedId]), (data) => {

        setMessages(data.message);
      })
      return () => {
        unsubscribe();
      };
    }
  }, [selectedUser?.uid])

  //lấy ra tất cả các đoạn chat mà người dùng hiện tại đang có
  useEffect(() => {
    const unsubscribe = subscribeToQueryUserChats(setQueryUserChats([user.uid]), (data) => {
      setListChats(data)
    })
    return () => {
      unsubscribe();
    };
  }, [user.uid]);

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
        maxSize={isMobile ? navCollapsedSize : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          setLSData('react-resizable-panels:collapsed', true);
        }}
        onExpand={() => {
          setIsCollapsed(false);
          setLSData('react-resizable-panels:collapsed', false);
        }}
        className={cn(
          isCollapsed && "min-w-[60px] md:min-w-[70px] transition-all duration-300 ease-in-out"
        )}
      >
        <ScrollArea className="h-[40rem]">
          <ChatSidebar
            isCollapsed={isCollapsed || isMobile}
            links={listChats.map((user) => ({
              uid: user.userInfo.uid,
              name: user.userInfo.name,
              lastMessage: user.lastMessage,
              avatar: user.userInfo.avatar,
              variant: selectedUser?.name === user.userInfo.name ? "secondary" : "ghost",
            }))}
            onClick={getUser}
            isMobile={isMobile}
          />
        </ScrollArea>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <ScrollArea className="h-[40rem]">
          <Show>
            <Show.When isTrue={selectedUser}>
              <Chat
                messages={message}
                selectedUser={selectedUser}
                sendMessage={sendMessage}
                isMobile={isMobile}
              />
            </Show.When>
          </Show>
        </ScrollArea>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
