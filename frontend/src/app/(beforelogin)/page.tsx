'use client';

import Image from 'next/image';
import Logo from '@/../public/assets/png/barobaro_logo.png';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const showLandingImage = setTimeout(() => {
      console.log('Move!');
      router.replace('/login');
    }, 3000);
  }, []);

  return (
    <section className="w-full h-[100dvh] flex flex-col justify-center items-center">
      <Image src={Logo} alt="baro" width={200} height={200} />
      LandingPage, 일단 5초뒤 이동하도록 임의로 지정
    </section>
  );
}
