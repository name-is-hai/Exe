import Page from "@/components/layout";
import { getLSData } from "@/lib/utils";
import { ChatLayout } from "./Resize/ChatLayout/chat-layout";

const ChatPage = () => {
    const layout = getLSData("react-resizable-panels:layout");
    const defaultLayout = layout ?? undefined;
    return (
        <Page>
            <div className="z-10 w-full h-full max-w-5xl mx-auto text-sm border md:rounded-lg md:w-full lg:flex">
                <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
            </div>
        </Page>
    )
}

export default ChatPage;