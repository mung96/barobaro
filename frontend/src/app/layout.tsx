import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import React from 'react';
import Head from 'next/head';

export const metadata: Metadata = {
  title: '바로바로',
  description: '전자계약서 기반 공연물품 대여 플랫폼',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '바로바로',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="ko">
      <body className="font-pretendard">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <div className="w-full max-w-[500px] mx-auto content-center ">
          {children}
        </div>
      </body>
    </html>
  );
}
