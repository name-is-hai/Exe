import { Message, UserMessage } from "@/types";
import { ChatMessage } from "./chat-message";
import ChatTopbar from "./chat-topbar";

interface ChatProps {
  messages: Message[];
  selectedUser: UserMessage;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile, sendMessage }: Readonly<ChatProps>) {
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
