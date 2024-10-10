'use client';

import Image from 'next/image';
import React, { useContext } from 'react';
import ProcessButton from './ProcessButton';
import { OpponentContext } from '@/contexts/ChatOpponentUserInfoContext';
import { useProfileObject } from '@/store/useMyProfile';
import { OriginBoardType } from '@/types/message/chat/OriginBoardType';

// 채팅창 상단에 뜨는 원본 글 미리보기 영역
type OriginBoardParams = {
  originBoardParams: OriginBoardType | undefined;
};

// 날짜 formatter (여기에서만 씀)
const formatDate = (str: string | undefined) => {
  if (str) {
    const [year, month, day] = str.split('-');
    return `${year.slice(-2)}.${month}.${day}`;
  }
  return undefined;
};

// 금액 formatter
const formatCost = (price: number | undefined) => {
  if (price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export default function OriginBoard({ originBoardParams }: OriginBoardParams) {
  const context = useContext(OpponentContext);
  if (!context) return <div></div>;
  const { ownerUuid } = context;

  const profile = useProfileObject();

  const isOwner = profile.id == ownerUuid;
  return (
    <div className="bg-white">
      <div className="flex flex-col p-[2vh]">
        <div className="h-3/4 flex flex-row">
          {/* 이미지, p 태그 들어감 */}
          <div className="w-3/12 flex flex-row">
            {originBoardParams?.thumbnail && (
              <img src={originBoardParams?.thumbnail} alt="cat" width={100} height={100} className="rounded-lg" />
            )}
          </div>
          <div className="w-9/12 flex flex-col pt-[1vh] pl-[2vh] items-start">
            <p className="text-xs text-gray-300">{`${formatDate(originBoardParams?.startDate)} ~ ${formatDate(originBoardParams?.endDate)}`}</p>
            <p className="text-black-100">{originBoardParams?.title}</p>
            <p className="font-bold text-black-100">{`${formatCost(originBoardParams?.rentalFee)}원/일`}</p>
          </div>
        </div>
        <div className="h-1/4 flex flex-row justify-start space-x-1 pt-[1.4vh] overflow-x-auto whitespace-nowrap">
          <ProcessButton
            isOwner={isOwner} // 여기도 api response로 받아서 끼워넣기
            hasContract
          />
        </div>
      </div>
    </div>
  );
}
