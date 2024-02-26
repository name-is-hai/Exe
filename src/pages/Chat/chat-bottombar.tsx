import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Show } from "@/components/utility/Show";
import { Message } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { FileImage, Mic, Paperclip, PlusCircle, SendHorizontal, ThumbsUp } from "lucide-react";
import React, { useRef, useState } from "react";
import { EmojiPicker } from "./emoji-picker";
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
      id: Date.now(),
      message: "👍",
      senderId: user.uid,
      created_at: Date.now(),
    })
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const user = getCurrentUser();
      sendMessage({
        id: Date.now(),
        senderId: user.uid,
        message: message.trim(),
        created_at: Date.now(),
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
      {/* <div className="flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost" size="icon"
              className={"h-9 w-9"}
            >
              <PlusCircle size={20} className="text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            side="top"
            className="w-full p-2">
            <Show>
              <Show.When isTrue={message.trim() || isMobile}>
                <div className="flex gap-2">
                  <Button
                    variant="ghost" size="icon"
                    className={"h-9 w-9"}
                  >
                    <Mic size={20} className="text-muted-foreground" />
                  </Button>
                  {BottombarIcons.map((icon, index) => (
                    <Button
                      variant="ghost" size="icon"
                      key={index}
                      className={"h-9 w-9"}
                    >
                      <icon.icon size={20} className="text-muted-foreground" />
                    </Button>
                  ))}
                </div>
              </Show.When>
              <Show.Else>
                <Button
                  variant="ghost" size="icon"
                  className={"h-9 w-9"}
                >
                  <Mic size={20} className="text-muted-foreground" />
                </Button>
              </Show.Else>
            </Show>
          </PopoverContent>
        </Popover>
        <Show>
          <Show.When isTrue={!message.trim() && !isMobile}>
            <div className="flex">
              {BottombarIcons.map((icon, index) => (
                <Button
                  variant={'ghost'}
                  size="icon"
                  key={index}
                  className={"h-9 w-9"}
                >
                  <icon.icon size={20} className="text-muted-foreground" />
                </Button>
              ))}
            </div>
          </Show.When>
        </Show>
      </div> */}
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
            <Button
              variant="ghost" size="icon"
              className={"h-9 w-9"}
              onClick={handleSend}
            >
              <SendHorizontal size={20} className="text-muted-foreground" />
            </Button>
          </Show.When>
          <Show.Else>
            <Button
              variant="ghost" size="icon"
              className={"h-9 w-9"}
              onClick={handleThumbsUp}
            >
              <ThumbsUp size={20} className="text-muted-foreground" />
            </Button>
          </Show.Else>
        </Show>
      </AnimatePresence>
    </div >
  );
}
