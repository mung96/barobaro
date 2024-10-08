'use client';

import Image from "next/image";
import Logo from '@/../public/assets/png/barobaro_logo.png';
import { useRouter, useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const RedirectComponent = () => {
  const searchParams = useSearchParams();
  localStorage.setItem('token',searchParams.get('token')!);
  const decoded = jwtDecode(searchParams.get('token')!);
  console.log(decoded);

  // const router = useRouter();
  // router.push('/home');

return <section className="w-full h-[100dvh] flex flex-col justify-center items-center  animate-pulse">
    <Image src={Logo} alt="baro" width={280} height={280} />
    <p className="text-2xl">잠시만 기다려주세요.</p>
  </section> 
}


export default RedirectComponent;