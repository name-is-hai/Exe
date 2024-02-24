import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import data from "@emoji-mart/data";
import Picker from '@emoji-mart/react';
import { SmileIcon } from "lucide-react";

interface EmojiPickerProps {
    onChange: (value: string) => void;
}


export const EmojiPicker = ({
    onChange
}: EmojiPickerProps) => {

    return (
        <Popover>
            <PopoverTrigger>
                <SmileIcon className="w-5 h-5 transition text-muted-foreground hover:text-foreground" />
            </PopoverTrigger>
            <PopoverContent
                className="w-full">
                <Picker
                    emojiSize={18}
                    theme="light"
                    data={data}
                    maxFrequentRows={1}
                    onEmojiSelect={(emoji: any) => onChange(emoji.native)}
                />
            </PopoverContent>
        </Popover>
    )
}
