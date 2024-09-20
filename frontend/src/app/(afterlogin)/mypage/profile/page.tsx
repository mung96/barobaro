'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import {
  useState, useEffect, useRef, ChangeEvent,
} from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';

export default function Profile() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleProfileImage = (event : ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    // const file = event.target.files && event.target.files[0];
    setImageFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const confirmProfileImage = () => {
    console.log('confirm');
    // 변경한 프로필 사진을 backend로 전송
    router.replace('/mypage');
  };

  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(imageFile);
    } else {
      setPreview(null);
    }
  }, [imageFile]);

  return (
    <NavBarLayout current="mypage">
      <header className="font-bold text-[15px] flex flex-col items-center mt-3 mb-10">
        <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
        프로필 수정
      </header>
      <main className="flex flex-col items-center h-[80dvh]">
        <section className="w-[90px] h-[90px] justify-center items-center relative">
          <div className="bg-gray-500 w-[89px] h-[89px] rounded-full overflow-hidden relative">
            {preview && (
              <Image src={preview} alt="Profile preview" fill style={{ objectFit: 'cover' }} className="rounded-full" />
            )}
          </div>
          <button
            type="button"
            className="bg-gray-400 w-[25px] h-[25px] rounded-full z-10 absolute bottom-0 right-0"
            onClick={handleButtonClick}
          >
            <div className="flex items-center justify-center">
              <CameraBody fill="#747483" width="15.2" height="12.67" />
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileImage}
          />
        </section>
        <section className="w-[84dvw]">
          <div className="mb-4 text-[13px]">
            닉네임
          </div>
          <div className="w-[85dvw] h-[26px] rounded-[7px] flex flex-col justify-center items-center border-gray-500 border-[1px]">
            <input className="w-[82dvw]" />
          </div>
        </section>

        <button type="button" className="bg-blue-100 w-[104px] h-[29px] rounded-[5px] absolute bottom-[14dvh]" onClick={() => confirmProfileImage()}>
          <p className="font-bold text-[14px] text-white">변경</p>
        </button>
      </main>
    </NavBarLayout>
  );
}
