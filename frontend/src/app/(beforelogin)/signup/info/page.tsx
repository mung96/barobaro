import Image from 'next/image';
import Logo from '@/../public/assets/png/barobaro_logo.png';

function SignUpRedirectPage() {
  return (
    <section className="w-full h-[100dvh] flex flex-col justify-center items-center animate-pulse ">
      <Image src={Logo} alt="baro" width={300} height={300} />
      <p className="text-3xl">잠시만 기다려주세요.</p>
    </section>
  );
}
export default SignUpRedirectPage;
