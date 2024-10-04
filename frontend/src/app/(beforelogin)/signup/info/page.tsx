'use client';

import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
// import dynamic from 'next/dynamic';
import Logo from '@/../public/assets/png/barobaro_logo.png';

// const InfoComponent = dynamic(
//   () => import('@/components/signup/InfoComponent'),
//   {
//     ssr: false,
//   },
// );

function SignUpRedirectPage() {
  // API요청 보내서 닉네임이랑 프로필 가져오기
  // const email = decodeURI(useSearchParams().get('key')!);

  //   const response = getSignUpInfo(email);

  // console.log(response);

  //   useEffect(() => {
  //     console.log(response);
  //   }, [response]);
  return (
    <section className="w-full h-[100dvh] flex flex-col justify-center items-center animate-pulse ">
      <Image src={Logo} alt="baro" width={300} height={300} />
      <p className="text-3xl">잠시만 기다려주세요.</p>
      {/* <InfoComponent email={email} /> */}
    </section>
  );
}
export default SignUpRedirectPage;
