import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '공공연희',
  description: '개인과 개인의 대여',
};

type Props = {
  children: React.ReactNode
};

export default function RootLayout({
  children,
}: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full max-w-[500px] mx-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
