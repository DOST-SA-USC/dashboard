import '@/styles/globals.css';

import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DOST SA USC',
  description: 'Official global tracker for DOST SA USC.',
  applicationName: 'DOST SA USC',
  keywords: [
    'DOST Scholars',
    'University of San Carlos',
    'USC',
    'DOST SA USC',
    'Scholars Association',
    'Philippines',
  ],
  authors: [{ name: 'DOST SA USC' }],
  creator: 'DOST SA USC',
  publisher: 'DOST SA USC',

  // SEO robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: 'https://dostsausc.org/',
    siteName: 'DOST SA USC',
    title: 'DOST SA USC',
    description: 'Official global tracker for DOST SA USC.',
    images: [
      {
        url: '/banner.jpg',
        width: 1200,
        height: 630,
        alt: 'DOST SA USC Official Banner',
      },
    ],
  },

  // Icons
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },

  // Theme color for browsers
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
        <Analytics />
      </body>
    </html>
  );
}
