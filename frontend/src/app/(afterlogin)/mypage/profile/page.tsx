'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import CameraBody from '@/components/(SVG_component)/CameraBody';

export default function Profile() {
  const profileSetting = () => {
    console.log('profileSetting');
  };
  // 현재 프로필 사진, 닉네임을 가져오고 이를 프로필 section에 나타낸다.
  return (
    <NavBarLayout current="mypage">
      <header className="font-bold text-[15px] flex flex-col items-center mt-3 mb-10">
        프로필 수정
      </header>
      <main className="flex flex-col items-center h-[80dvh]">
        <section className="w-[90px] h-[90px] justify-center items-center relative">
          <div className="bg-gray-500 w-[89px] h-[89px] rounded-full" />
          <button
            type="button"
            onClick={() => profileSetting()}
            className="bg-gray-400 w-[25px] h-[25px] rounded-full z-10 absolute bottom-0 right-0"
          >
            <div className="flex items-center justify-center">
              <CameraBody fill="#747483" width="15.2" height="12.67" />
            </div>
          </button>
        </section>
        <section className="w-[84dvw]">
          <div className="mb-4 text-[13px]">
            닉네임
          </div>
          <div className="w-[85dvw] h-[26px] rounded-[7px] flex flex-col justify-center items-center border-gray-500 border-[1px]">
            <input className="w-[82dvw]" />
          </div>
        </section>
        <button type="button" className="bg-blue-100 w-[104px] h-[29px] rounded-[5px] absolute bottom-[14dvh]">
          <p className="font-bold text-[14px] text-white">변경</p>
        </button>
      </main>
    </NavBarLayout>
  );
}
