import { UserData } from "../data";
import ChatTopbar from "./chat-topbar";
import { ChatMessage } from "./chat-message";
import React from "react";
import { Message, UserMessage } from "@/types";

interface ChatProps {
  messages: Message[]
  selectedUser: UserMessage;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages
  );

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
  };

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatMessage
        messages={messages}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
