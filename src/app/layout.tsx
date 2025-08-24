import '@/styles/globals.css';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://dostsausc.org'),
  title: 'DOST SA USC',
  description:
    "Official Website of the DOST Scholars' Association - University of San Carlos! Home of your USC Isko championing academic excellence, community service, and all things DOST SA USC Iskolars ng Agham, lagi't lagi, para sa bayan!",
  openGraph: {
    title: 'DOST SA USC',
    description:
      "Official Website of the DOST Scholars' Association - University of San Carlos! Home of your USC Isko championing academic excellence, community service, and all things DOST SA USC Iskolars ng Agham, lagi't lagi, para sa bayan!",
    url: 'https://dostsausc.org',
    siteName: 'DOST SA USC',
    images: [
      {
        url: '/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'DOST SA USC Official Banner',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DOST SA USC',
    description:
      "Official Website of the DOST Scholars' Association - University of San Carlos! Home of your USC Isko championing academic excellence, community service, and all things DOST SA USC Iskolars ng Agham, lagi't lagi, para sa bayan!",
    images: ['/banner.jpg'],
  },
  icons: {
    icon: '/favi.ico',
    shortcut: '/favi.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: 'oklch(0.3994 0.1003 271.8184)',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: 'oklch(57.954% 0.1119 274.075)',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-secondary bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/pattern-light.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px] dark:bg-[url('/pattern-dark.png')]">
            {children}
          </div>
          <Toaster position="bottom-right" richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
