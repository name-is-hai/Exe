import { ThemeProvider } from "@/components/themes/theme-provider"
import { Header } from "../layout/header/header";
import { Separator } from "../ui/separator";

function Page({ children }: any) {
    // const layout = localStorage.getItem("react-resizable-panels:layout");
    // const collapsed = localStorage.getItem("react-resizable-panels:collapsed");

    // const defaultLayout = layout ? JSON.parse(layout) : undefined;
    // const defaultCollapsed = collapsed ? JSON.parse(collapsed) : undefined;
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="flex-col md:flex">
                <Header />
                <Separator />
                {children}
            </div>
        </ThemeProvider>
    );
}


export default Page
