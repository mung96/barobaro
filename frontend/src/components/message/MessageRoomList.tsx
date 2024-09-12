'use client';

import ChatRoomEach from './ChatRoom';
import { ChatRoomType } from './ChatRoomType';

interface MessageRoomListParam {
  selectValue: string;
}

export default function MessageRoomList({ selectValue }: MessageRoomListParam) {
  const chatList: ChatRoomType[] = [
    // 원본 데이터 배열
    {
      otherUserNickname: '뗀석기팔아요',
      lastMessage: '전자계약서 서명을 요청하였습니다.',
      stuffThumbImageSrc: '/tempdata/bong.jpeg',
      profileImageSrc: '/tempdata/cat.jpg',
      unread: true,
      own: true,
    },
    {
      otherUserNickname: '랄나날라',
      lastMessage: '저 오후 5시에 시간이 되는데 그때쯤 발송할게요',
      stuffThumbImageSrc: '/tempdata/bong3.jpg',
      profileImageSrc: '/tempdata/cat2.jpg',
      unread: false,
      own: true,
    },
    {
      otherUserNickname: '몽이언니',
      lastMessage: '흠 ... 진행 중인 분 예약 취소되면 다시 말씀드릴게요',
      stuffThumbImageSrc: '/tempdata/bong4.jpg',
      profileImageSrc: '/tempdata/cat3.jpg',
      unread: true,
      own: false,
    },
    {
      otherUserNickname: '역삼동망치',
      lastMessage: '오후 4시쯤 삼성전자스토어 앞에서 만나실래요?',
      stuffThumbImageSrc: '/tempdata/bong5.jpg',
      profileImageSrc: '/tempdata/cat4.jpg',
      unread: false,
      own: true,
    },
    {
      otherUserNickname: '줄무늬양말',
      lastMessage:
        '분실 시에 3만원 별도 청구되시구요 이 항목 계약서에 넣을게요',
      stuffThumbImageSrc: '/tempdata/bong2.jpg',
      profileImageSrc: '/tempdata/cat5.jpg',
      unread: false,
      own: true,
    },
    {
      otherUserNickname: '새발자',
      lastMessage: '500원만 깎아주세요 제발요',
      stuffThumbImageSrc: '/tempdata/bong6.jpg',
      profileImageSrc: '/tempdata/cat6.jpg',
      unread: false,
      own: false,
    },
    {
      otherUserNickname: '배고파',
      lastMessage: '실례가 안 된다면 아이스크림 하나만 사주십시오',
      stuffThumbImageSrc: '/tempdata/bong7.jpg',
      profileImageSrc: '/tempdata/cat7.jpg',
      unread: false,
      own: false,
    },
  ];

  // 사용자가 선택한 탭 값에 따라 '전체', '소유', '대여' 물건 따로 보여주기
  const messageFilter = (type: boolean, unread: boolean, own: boolean) => {
    switch (selectValue) {
      case 'entire':
        return type === unread;
      case 'own':
        return type === unread && own;
      case 'lent':
        return type === unread && !own;
      default:
        return false;
    }
  };

  const readMessages = chatList.filter((each) => messageFilter(false, each.unread, each.own));
  const unReadMessages = chatList.filter((each) => messageFilter(true, each.unread, each.own));

  return (
    <div className="mt-[2vh] flex-1 overflow-auto">
      {/* filter 써서 안 읽은 메시지들 위로 먼저 올리고 나머지 그 다음에 뿌리기 */}
      {unReadMessages.map((each) => (
        <ChatRoomEach
          otherUserNickname={each.otherUserNickname}
          lastMessage={each.lastMessage}
          stuffThumbImageSrc={each.stuffThumbImageSrc}
          profileImageSrc={each.profileImageSrc}
          unread={each.unread}
          own={each.own}
        />
      ))}
      {readMessages.map((each) => (
        <ChatRoomEach
          otherUserNickname={each.otherUserNickname}
          lastMessage={each.lastMessage}
          stuffThumbImageSrc={each.stuffThumbImageSrc}
          profileImageSrc={each.profileImageSrc}
          unread={each.unread}
          own={each.own}
        />
      ))}

      <div className="w-full h-[7vh]">&emsp;</div>
    </div>
  );
}
