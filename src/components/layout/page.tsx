import { Toaster } from 'sonner';

import { Header } from '@/components/layout/Header/Header';
import { ThemeProvider } from '@/components/themes/theme-provider';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Footer } from './Footer/Footer';

function Page({ children }: any) {
  return (
    <ThemeProvider
      defaultTheme="light"
      storageKey="vite-ui-theme"
    >
      <div className="flex-col md:flex">
        <ScrollArea
          className="h-screen"
          type="scroll"
        >
          <Header />
          {children}
          <Footer />
        </ScrollArea>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default Page;
