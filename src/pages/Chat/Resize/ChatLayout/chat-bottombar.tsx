import { buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Show } from "@/components/utility/Show";
import { useQuery } from "@/hook/useQuery";
import { fireStore } from "@/lib/firebase";
import { cn, getLSData } from "@/lib/utils";
import { Message, User } from "@/types";
import { addDoc, collection } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { EmojiPicker } from "../emoji-picker";

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
  const query = useQuery();

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = async () => {
    const user = getLSData('user') as User;
    await addDoc(collection(fireStore, 'messages', user.uid, query.get('uid')), {
      uid: user.uid,
      message: "👍",
      created_at: Date.now(),
    });
    setMessage("");
  };

  const handleSend = async () => {
    if (message.trim()) {
      const user = getLSData('user') as User;
      await addDoc(collection(fireStore, 'messages', user.uid, query.get('uid')), {
        uid: user.uid,
        message: message.trim(),
        created_at: Date.now(),
      });
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
