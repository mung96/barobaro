'use client';

import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import OriginBoard from '@/components/message/chat/OriginBoard';
import Dialogs from '@/components/message/chat/Dialogs';
import ChatWindow from '@/components/message/chat/ChatWindow';
import MessageFormType from '@/components/message/chat/MessageFormType';
import useSocketClientModel from '@/hooks/message/chat/useSocketClientModel';

export default function Chat() {
  // 채팅 참여 상대방 닉네임 떼어서 저장
  const { chat_id: chatId } = useParams();
  const roomName: string = `${typeof chatId === 'string' && decodeURI(chatId)}님과의 채팅`;
  const scrollRef = useRef<HTMLDivElement>(null);

  const UserId = '김말이'; // 사용자 PK

  const [messages, setMessages] = useState<MessageFormType[]>([]);

  const handleAddMessages = (message: MessageFormType[]): void => {
    // client에 props로 넘기는 message setter
    setMessages(message);
  };

  const socketClient = useSocketClientModel(UserId, handleAddMessages);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 고정 헤더와 OriginBoard */}
      <div className="fixed top-0 w-full bg-white z-10 max-w-[500px]">
        <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
        <OriginBoard />
      </div>

      {/* 스크롤 가능한 Dialogs 영역 */}
      <div
        className="flex-1 mt-[25vh] pb-[8vh] overflow-y-scroll"
        ref={scrollRef}
      >
        <Dialogs messages={messages} />
      </div>

      {/* 하단 고정 ChatWindow */}
      <div className="fixed bottom-0 box-border w-full bg-white z-10 max-w-[500px]">
        <ChatWindow client={socketClient} />
      </div>
    </div>
  );
}
