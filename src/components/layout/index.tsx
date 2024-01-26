import { ThemeProvider } from "@/components/themes/theme-provider"
import { Header } from "@/components/layout/Header";

function Page({ children }: any) {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="flex-col md:flex">
                <Header />
                {children}
            </div>
        </ThemeProvider>
    );
}


export default Page
