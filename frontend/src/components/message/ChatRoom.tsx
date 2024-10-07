// 채팅목록에 띄울 채팅방(1개)
import Link from 'next/link';
import Image from 'next/image';
import { MouseEvent } from 'react';
import ChatRoomType from './ChatRoomType';

export default function ChatRoomEach({
  chatRoomId,
  profileImage,
  nickname,
  lastChat,
  productMainImage,
}: ChatRoomType) {
  const isClicked = (e: MouseEvent<HTMLElement>) => {
    e.currentTarget.classList.add('bg-gray-200');
  };

  return (
    <Link
      className="flex gap-0 p-4"
      href={encodeURI(`message/chat/${chatRoomId}`)}
      onMouseDown={isClicked}
    >
      <div className="w-2/12 flex items-center justify-center">
        <div className="relative w-full h-full aspect-square">
          <Image
            src={profileImage} // public 폴더 내의 이미지 경로
            alt="profImg" // 이미지 설명 추가
            layout="fill" // 부모 div의 크기에 맞게 이미지가 채워지도록 설정
            objectFit="cover" // 이미지 비율 유지하면서 부모 div에 맞게 채움
            className="rounded-full" // 원형으로 만들기
          />
        </div>
      </div>

      {/* 가운데 텍스트 영역 */}
      <div className="w-8/12 flex flex-col justify-start p-2">
        <div className="flex items-center">
          <span className="font-bold inline-block">{nickname}</span>
        </div>
        <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
          {lastChat}
        </p>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="w-2/12 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={productMainImage} // public 폴더 내의 이미지 경로
            alt="thumb" // 이미지 설명 추가
            layout="fill" // 부모 div의 크기에 맞게 이미지가 채워지도록 설정
            objectFit="cover" // 이미지 비율 유지하면서 부모 div에 맞게 채움
            className="rounded-lg" // 원형으로 만들기
          />
        </div>
      </div>
    </Link>
  );
}
