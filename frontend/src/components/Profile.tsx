'use client';

import Image from 'next/image';
import Baroping from '@/../public/assets/png/baroping.png';
import { useRouter } from 'next/navigation';

export default function Profile() {
  const router = useRouter();
  const goProfileSetting = () => {
    router.push('/mypage/profile');
  };

  return (
    <section className="flex flex-row items-center justify-center w-[90dvw] my-3">
      <div className="border border-gray-200 rounded-full w-12 h-12 items-center relative overflow-hidden">
        <Image src={Baroping} alt="barorping" width={47} height={47} />
      </div>
      <div className="ms-3.5 me-3">
        <p className="text-[14px] font-bold">바로핑</p>
        <p className="text-[12px]">barobaroping@gmail.com</p>
      </div>
      <button type="button" onClick={() => goProfileSetting()} className="w-[74px] h-[25px] bg-gray-400 flex justify-center items-center rounded-[5px]">
        <p className="text-[10px]">프로필 수정</p>
      </button>
    </section>
  );
}
