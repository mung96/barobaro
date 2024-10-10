'use client';

import Image from 'next/image';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import useProfilePhotoModel from '@/hooks/user/useProfilePhotoModel';
import useProfileNicknameModel from '@/hooks/user/useProfileNicknameModel';
import { signnUp, updateProfile } from '@/services/user/profile';
import nicknameInput from "@/components/signup/NicknameInput";
import Header from "@/components/Header";

export default function ProfilePhoto({ isSignup }: { isSignup: boolean }) {
  const { file, fileInputRef, handleProfileImage, handleButtonClick } =
    useProfilePhotoModel();
  const { inputNickname, valid, handleNicknameChange } =
    useProfileNicknameModel();
  const nextStep = () => {
    if (isSignup) {
      signnUp();
    } else {
      // 프로필 업데이트 로직
      updateProfile(inputNickname, file);
    }
  };

  return (
    <main className="flex flex-col items-center">
      <section className="w-[90px] h-[90px] justify-center items-center relative">
        <div className="bg-gray-500 w-[89px] h-[89px] rounded-full overflow-hidden relative">
          {file && (
            <Image
              src={file as string}
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
            className="w-full max-w-[450px] focus:outline-none pl-2"
            onChange={(e) => handleNicknameChange(e.target.value)}
            value={inputNickname}
          />
        </div>
        {!valid && inputNickname !== '' && (
          <div className="flex flex-col items-end w-full max-w-[500px]">
            <p className="text-[10px]" style={{ color: '#F7385A' }}>
              영어, 숫자, 한글만 사용하여 10자 이내의 닉네임을 입력해주세요.
            </p>
          </div>
        )}
      </section>
      <div className="w-[100%] justify-items-center flex p-4 bg-white">
        <button
          type="button"
          className={`${
            valid ? 'bg-blue-100' : 'bg-gray-400'
          } w-full max-w-[450px] h-[36px] rounded-[5px] mx-auto`}
          disabled={!valid}
          onClick={nextStep}
        >
          <p
            className={`font-bold text-[14px] ${
              valid ? 'text-white' : 'text-gray-200'
            }`}
          >
            {isSignup ? '다음' : '변경'}
          </p>
        </button>
      </div>
    </main>
  );
}
