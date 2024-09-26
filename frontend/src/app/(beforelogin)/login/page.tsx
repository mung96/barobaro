import BaroPing from '@/../public/assets/png/baroping.png';
import SocialBar from '@/components/login/Social';
import Image from 'next/image';

export default function Login() {
  return (
    <main className="flex flex-col justify-center items-center h-[100dvh]">
      <Image src={BaroPing} alt="baro" width={200} height={200} />
      <section>
        <SocialBar socialName="Naver" />
        <SocialBar socialName="Kakao" />
        <SocialBar socialName="Google" />
      </section>
    </main>
  );
}
