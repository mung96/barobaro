'use client';

import Image from "next/image";


import Logo from '@/../public/assets/png/barobaro_logo.png';
import { useSearchParams } from "next/navigation";

const RedirectComponent = () => {
const searchParams = useSearchParams();
localStorage.setItem('token',searchParams.get('token')!);

return <section className="w-full h-[100dvh] flex flex-col justify-center items-center">
    <Image src={Logo} alt="baro" width={200} height={200} className="animate-pulse" />
    <p>잠시만 기다려주세요.</p>
  </section> 
}


export default RedirectComponent;