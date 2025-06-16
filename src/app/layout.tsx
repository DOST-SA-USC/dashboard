import type { Metadata } from 'next';
import '@/globals.css';

export const metadata: Metadata = {
  title: 'DOST SA USC',
  description: 'Official scholar portal for DOST SA USC.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="dark font-secondary bg-background antialiased">
        <div className="flex h-screen w-full items-center justify-center p-8">
          {children}
        </div>
      </body>
    </html>
  );
}
