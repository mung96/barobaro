'use client';

import KakaoMap from '@/components/map/KakaoMap';
import PictureCarousel from '@/components/post/Carousel';
import Profile from '@/components/user/Profile';
import PostContent from '@/components/post/PostContent';
import ContractCondition from '@/components/post/ContractCondition';

// frontend - .env => NEXT_PUBLIC_KAKAO_CLIENT_ID=APIKEY
export default function PostDetail() {
  return (
    <section className="flex flex-col items-center -z-0">
      <div className="flex w-full">
        <Profile hasEmail={false} hasEditBtn={false} />
        <div className="flex flex-1" />
        <div className="flex">
          <button
            type="button"
            className="text-[10px] underline text-gray-300 me-1 w-[30px]"
          >
            수정
          </button>
          <button
            type="button"
            className="text-[10px] underline text-gray-300 w-[30px]"
          >
            삭제
          </button>
        </div>
      </div>
      <section className="flex justify-center items-center -z-0">
        <PictureCarousel />
      </section>
      <div className="bg-gray-500 w-[90%] h-[1px]" />
      <PostContent />
      <KakaoMap width="85%" height="20dvh" lat={37.498333} lng={126.866667} />
      <ContractCondition />
    </section>
  );
}
