import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn, getLSData } from "@/lib/utils";
import { Message, UserMessage } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import React, { useRef } from "react";
import ChatBottombar from "./chat-bottombar";

interface ChatMessageProps {
  messages?: Message[];
  selectedUser: UserMessage;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatMessage({ messages, selectedUser, sendMessage, isMobile }: Readonly<ChatMessageProps>) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (

    <div className="flex flex-col w-full h-full overflow-x-hidden overflow-y-hidden">
      <div
        ref={messagesContainerRef}
        className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                (getLSData('user').uid === message.uid) ? "items-end" : "items-start"
              )}
            >
              <div className="flex items-center gap-3">
                {message.uid !== selectedUser.uid && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
                <span className="max-w-xs p-3 rounded-md bg-accent">
                  {message.message}
                </span>
                {message.uid === selectedUser.uid && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={message.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
