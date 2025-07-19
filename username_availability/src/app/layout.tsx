import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Username Availability Checker',
  description: 'Check if your desired username is available',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
