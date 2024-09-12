'use client';

import { useParams } from 'next/navigation';
// eslint-disable-next-line import/extensions
import Header from '@/components/Header';
import OriginBoard from '@/components/message/chat/OriginBoard';
import Dialogs from '@/components/message/chat/Dialogs';
import ChatWindow from '@/components/message/chat/ChatWindow';

export default function Chat() {
  // 채팅 참여 상대방 닉네임 떼어서 저장
  const { chat_id: chatId } = useParams();
  const roomName: string = `${typeof chatId === 'string' && decodeURI(chatId)}님과의 채팅`;
  return (
    <div className="flex flex-col">
      <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
      <OriginBoard />
      <Dialogs />
      <div className="">
        {/* 여기부터 작업 시작하기. chatwindow가 화면 맨 아래로 고정되게 
          flex align-self-end
          flex 적용하면 width 이상해지는 버그 있음
        */}
        <ChatWindow />
      </div>
    </div>
  );
}
