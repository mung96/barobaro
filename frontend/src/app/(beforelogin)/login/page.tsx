import Logo from '@/../public/assets/png/barobaro_logo.png';
import SocialBar from '@/components/login/Social';
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {
  return (
    <main className="flex flex-col justify-center items-center h-[100dvh]">
      <Image src={Logo} alt="baro" width={200} height={200} />
      <section>
        <SocialBar socialName="Naver" />
        <SocialBar socialName="Kakao" />
        <SocialBar socialName="Google" />
        <Link href={'/signup/1'}>Test Signup</Link>
      </section>
    </main>
  );
}
