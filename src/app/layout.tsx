import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Tracker | DOST SA USC',
  description: 'Official organization tracker for DOST SA USC.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-secondary bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
            {children}
          </div>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
