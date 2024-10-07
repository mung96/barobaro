'use client';

import useMessageRoomListModel from '@/hooks/message/useMessageRoomListModel';
import ChatRoomEach from './ChatRoom';
import ChatRoomType from './ChatRoomType';

type MessageRoomListParam = {
  selectValue: string;
};

export default function MessageRoomList({ selectValue }: MessageRoomListParam) {
  useMessageRoomListModel();

  const chatList: ChatRoomType[] = [
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '뗀석기팔아요',
      lastChat: '전자계약서 서명을 요청하였습니다.',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'owner', // own이 true일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '랄나날라',
      lastChat: '저 오후 5시에 시간이 되는데 그때쯤 발송할게요',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'owner', // own이 true일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '몽이언니',
      lastChat: '흠 ... 진행 중인 분 예약 취소되면 다시 말씀드릴게요',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'guest', // own이 false일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '역삼동망치',
      lastChat: '오후 4시쯤 삼성전자스토어 앞에서 만나실래요?',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'owner', // own이 true일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '줄무늬양말',
      lastChat: '분실 시에 3만원 별도 청구되시구요 이 항목 계약서에 넣을게요',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'owner', // own이 true일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '새발자',
      lastChat: '500원만 깎아주세요 제발요',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'guest', // own이 false일 때
    },
    {
      profileImage: 'https://loremflickr.com/320/240',
      nickname: '배고파',
      lastChat: '실례가 안 된다면 아이스크림 하나만 사주십시오',
      productMainImage: 'https://loremflickr.com/320/240',
      lastChatTime: new Date(), // 현재 시간으로 설정
      chatRoomStatus: 'guest', // own이 false일 때
    },
  ]; // axios로 불러와서 세팅해야 함

  // 사용자가 선택한 탭 값에 따라 '전체', '소유', '대여' 물건 따로 보여주기
  const messageFilter = (chatRoom: ChatRoomType) => {
    switch (selectValue) {
      case 'entire':
        return true; // 모든 채팅방을 보여줌
      case 'own':
        return chatRoom.chatRoomStatus === 'owner'; // 소유한 채팅방만 보여줌
      case 'lent':
        return chatRoom.chatRoomStatus === 'guest'; // 대여한 채팅방만 보여줌
      default:
        return false; // 해당하지 않는 경우
    }
  };

  const chatRooms = chatList.filter(messageFilter);

  return (
    <div className="mt-[2vh] flex-1 overflow-auto">
      {chatRooms.map((each) => (
        <ChatRoomEach
          nickname={each.nickname}
          profileImage={each.profileImage}
          productMainImage={each.productMainImage}
          lastChat={each.lastChat}
          lastChatTime={each.lastChatTime}
          chatRoomStatus={each.chatRoomStatus}
        />
      ))}

      <div className="w-full h-[7vh]">&emsp;</div>
    </div>
  );
}
