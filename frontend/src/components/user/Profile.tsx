'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Baro from '@/../public/assets/png/baroping.png'

type Props = {
  hasEmail: boolean;
  hasEditBtn: boolean;
  email: string;
  nickname: string;
  url: string;
};

export default function Profile({
  hasEmail,
  hasEditBtn,
  email,
  nickname,
  url,
}: Props) {
  const router = useRouter();
  const goProfileSetting = () => {
    router.push('/mypage/profile');
  };
  // 수정 및 삭제는 유저 ID와 작성자 ID가 일치하는 경우 띄우도록 추후 수정.
  return (
    <section className="flex flex-row items-center max-w-[500px] my-3 mx-8">
      <div className="flex items-center">
        <div className="border border-gray-200 rounded-full w-12 h-12 items-center relative overflow-hidden">
          {/*TODO: url이 /프로필 꼴로 도착해서 404 에러 발생함. 추후 정상적 값 확인하고 수정할 것*/}
          <Image
            src={url}
            alt={url}
            width={47}
            height={47}
            unoptimized={true}
          />
        </div>
        <div className="ms-3.5 flex flex-col justify-center">
          <p className="text-[14px] font-bold">{nickname}</p>
          {hasEmail && <p className="text-[12px]">{email}</p>}
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
