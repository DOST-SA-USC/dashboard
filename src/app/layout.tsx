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
      <body className="antialiased">{children}</body>
    </html>
  );
}
