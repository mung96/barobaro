'use client';

import Image from 'next/image';
import React from 'react';

// import SVG files
import Clipboard from '@/components/(SVG_component)/(message)/clipboard';
import AddMessage from '@/components/(SVG_component)/(message)/addMessage';

// 채팅창 상단에 뜨는 원본 글 미리보기 영역
export default function OriginBoard() {
  return (
    <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} className="">
      <div className="flex flex-col p-[2vh]">
        <div className="h-3/4 flex flex-row">
          {/* 이미지, p 태그 들어감 */}
          <div className="w-3/12 flex flex-row">
            <Image
              src="/tempdata/cat5.jpg"
              alt="cat"
              width={100}
              height={100}
              className="rounded-lg"
            />
          </div>
          <div className="w-9/12 flex flex-col pt-[1vh] pl-[2vh] items-start">
            <p className="text-xs text-gray-300">24.09.05 ~ 24.09.29</p>
            <p className="text-black-100">고양이 쓰다듬고 가세요</p>
            <p className="font-bold text-black-100">100,000원/일</p>
          </div>
        </div>
        <div className="h-1/4 flex flex-row justify-start space-x-1 pt-[1.4vh]">
          {/* 버튼 세 개 들어감 */}
          <button
            type="button"
            className="bg-gray-400 pl-[2vh] pr-[2vh] pt-[0.4vh] pb-[0.4vh] rounded-lg flex items-center"
          >
            <Clipboard />
            <span>&nbsp;계약조건</span>
          </button>
          <button
            type="button"
            className="bg-gray-400 pl-[2vh] pr-[2vh] rounded-lg flex items-center"
          >
            <AddMessage />
            <span>&nbsp;계약요청</span>
          </button>
        </div>
      </div>
    </div>
  );
}
