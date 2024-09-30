// 채팅목록에 띄울 채팅방(1개)
import Link from 'next/link';
import Image from 'next/image';
import ChatRoomType from './ChatRoomType';

export default function ChatRoomEach({
  profileImageSrc,
  otherUserNickname,
  lastMessage,
  stuffThumbImageSrc,
  unread,
}: ChatRoomType) {
  const isClicked = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.classList.add('bg-gray-200');
  };

  return (
    <Link
      className={`flex gap-0 p-4  ${unread && 'bg-blue-200 opacity-80'} `}
      href={encodeURI(`message/chat/${otherUserNickname}`)}
      onMouseDown={isClicked}
    >
      <div className="w-2/12 flex items-center justify-center">
        <div className="relative w-full h-full aspect-square">
          <Image
            src={profileImageSrc} // public 폴더 내의 이미지 경로
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
          <span className="font-bold inline-block">{otherUserNickname}</span>
          {unread && (
            <span className="text-xs inline-block ml-1 bg-blue-100 text-white p-[0.3vh] rounded-full">
              &nbsp;새 메시지&nbsp;
              {/* 안 읽은 메시지의 수(파라메터 추가해야 함) or 새 메시지 중 선택 */}
            </span>
          )}
        </div>
        <p className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">
          {lastMessage}
        </p>
      </div>

      {/* 오른쪽 이미지 */}
      <div className="w-2/12 flex items-center justify-center">
        <div className="relative w-full h-full">
          <Image
            src={stuffThumbImageSrc} // public 폴더 내의 이미지 경로
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
