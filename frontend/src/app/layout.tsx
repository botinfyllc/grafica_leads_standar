import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Te lo compro en USA - dashboard',
  description: 'Login page for Te lo compro en USA',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
