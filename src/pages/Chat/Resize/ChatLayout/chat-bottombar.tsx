import { buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Show } from "@/components/utility/Show";
import { useQuery } from "@/hook/useQuery";
import { fireStore } from "@/lib/firebase";
import { cn, getLSData } from "@/lib/utils";
import { Message, User } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage, Mic, Paperclip, PlusCircle, SendHorizontal, ThumbsUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { EmojiPicker } from "../emoji-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getCurrentUser } from "@/services/authen.service";

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage, isMobile,
}: Readonly<ChatBottombarProps>) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const user = getCurrentUser();
    sendMessage({
      uid: user.uid,
      name: user.display_name ?? user.phone,
      message: "👍",
      created_at: Date.now(),
      avatar: user.photo ?? 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
    })
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const user = getCurrentUser();
      sendMessage({
        uid: user.uid,
        message: message.trim(),
        created_at: Date.now(),
        avatar: user.photo ?? 'https://cdn-icons-png.flaticon.com/512/9131/9131529.png',
        name: user.display_name ?? user.phone
      })
      setMessage("");
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex items-center justify-between w-full gap-2 p-2">
      <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
              )}
            >
              <PlusCircle size={20} className="text-muted-foreground" />
            </div>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full p-2">
            <Show>
              <Show.When isTrue={message.trim() || isMobile}>
                <div className="flex gap-2">
                  <div
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon" }),
                      "h-9 w-9",
                      "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                    )}
                  >
                    <Mic size={20} className="text-muted-foreground" />
                  </div>
                  {BottombarIcons.map((icon, index) => (
                    <div
                      key={index}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "h-9 w-9",
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <icon.icon size={20} className="text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </Show.When>
              <Show.Else>
                <div
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <Mic size={20} className="text-muted-foreground" />
                </div>
              </Show.Else>
            </Show>
          </PopoverContent>
        </Popover>
        <Show>
          <Show.When isTrue={!message.trim() && !isMobile}>
            <div className="flex">
              {BottombarIcons.map((icon, index) => (
                <div
                  key={index}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                    "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                  )}
                >
                  <icon.icon size={20} className="text-muted-foreground" />
                </div>
              ))}
            </div>
          </Show.When>
        </Show>
      </div>
      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="relative flex items-center w-full"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Textarea
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Aa"
            className="flex items-center w-full h-10 border rounded-full resize-none bg-background"
          ></Textarea>
          <div className="absolute bottom-[6px] right-2">
            <EmojiPicker onChange={(value) => {
              setMessage(message + value)
              if (inputRef.current) {
                inputRef.current.focus();
              }
            }} />
          </div>
        </motion.div>
        <Show>
          <Show.When isTrue={message.trim()}>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleSend}
            >
              <SendHorizontal size={20} className="text-muted-foreground" />
            </div>
          </Show.When>
          <Show.Else>
            <div
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "h-9 w-9",
                "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white shrink-0"
              )}
              onClick={handleThumbsUp}
            >
              <ThumbsUp size={20} className="text-muted-foreground" />
            </div>
          </Show.Else>
        </Show>
      </AnimatePresence>
    </div >
  );
}
