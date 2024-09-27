'use client';

import Image from 'next/image';
import Baroping from '../../../public/assets/png/baroping.png';
import { useRouter } from 'next/navigation';

type Props = {
  hasEmail: boolean;
  hasEditBtn: boolean;
};

export default function Profile({ hasEmail, hasEditBtn }: Props) {
  const router = useRouter();
  const goProfileSetting = () => {
    router.push('/mypage/profile');
  };
  // 수정 및 삭제는 유저 ID와 작성자 ID가 일치하는 경우 띄우도록 추후 수정.
  return (
    <section className={`flex flex-row items-center max-w-[500px] my-3 mx-8`}>
      <div className="flex items-center">
        <div className="border border-gray-200 rounded-full w-12 h-12 items-center relative overflow-hidden">
          <Image src={Baroping} alt="barorping" width={47} height={47} />
        </div>
        <div className="ms-3.5 flex flex-col justify-center">
          <p className="text-[14px] font-bold">바로핑</p>
          {hasEmail && <p className="text-[12px]">barobaroping@gmail.com</p>}
        </div>
        {hasEditBtn && (
          <button
            type="button"
            onClick={() => goProfileSetting()}
            className="w-[74px] h-[25px] bg-gray-400 flex justify-center items-center rounded-[5px] mx-2"
          >
            <p className="text-[10px]">프로필 수정</p>
          </button>
        )}
      </div>
    </section>
  );
}
