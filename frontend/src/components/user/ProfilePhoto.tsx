'use client';

import NavBarLayout from '@/layout/NavBarLayout';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import { useState, useEffect, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { file } from '@babel/types';

export default function ProfilePhoto({ isSignup }: { isSignup: boolean }) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [valid, setValid] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleProfileImage = (event: ChangeEvent<HTMLInputElement>) => {
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

  const nicknameValid = (value: string) => {
    console.log(value);
    const regex = /^[a-zA-Z가-힣0-9]{1,10}$/;
    console.log(regex.test(value));
    if (regex.test(value)) {
      setValid(true);
      setInputNickname(value);
    } else {
      setValid(false);
      setInputNickname('');
    }
  };

  const nextStep = () => {
    // 버튼을 누르면 닉네임 정보를 전송함.
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
    <main className="flex flex-col items-center">
      <section className="w-[90px] h-[90px] justify-center items-center relative">
        <div className="bg-gray-500 w-[89px] h-[89px] rounded-full overflow-hidden relative">
          {preview && (
            <Image
              src={preview}
              alt="Profile preview"
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-full"
            />
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
      <section className="max-w-[450px] w-[90%] mx-[20px]">
        <div className="mb-4 text-[13px]">닉네임</div>
        <div className="w-full h-[32px] rounded-[7px] flex flex-col justify-center items-center border-gray-500 border-[1px]">
          <input
            className="w-full max-w-[450px]"
            onChange={(e) => nicknameValid(e.target.value)}
          />
        </div>
        {valid ? null : (
          <div className="flex flex-col items-end w-full max-w-[500px]">
            <p className="text-[10px]" style={{ color: '#F7385A' }}>
              영어, 숫자, 한글만 사용하여 10자 이내의 닉네임을 입력해주세요.
            </p>
          </div>
        )}
      </section>
      <button
        type="button"
        className={`${valid ? 'bg-blue-100' : 'bg-gray-400'} w-[104px] h-[29px] rounded-[5px] my-3`}
        disabled={!valid}
        onClick={() => nextStep()}
      >
        <p
          className={`font-bold text-[14px] ${valid ? 'text-white' : 'text-gray-200'}`}
        >
          {isSignup ? '다음' : '변경'}
        </p>
      </button>
    </main>
  );
}
