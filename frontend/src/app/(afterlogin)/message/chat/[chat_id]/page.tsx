'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import OriginBoard from '@/components/message/chat/OriginBoard';
import Dialogs from '@/components/message/chat/Dialogs';
import ChatWindow from '@/components/message/chat/ChatWindow';
import MessageFormType from '@/components/message/chat/MessageFormType';
import useSocketClientModel from '@/hooks/message/chat/useSocketClientModel';
import useChatPageModel from '@/hooks/message/chat/useChatPageModel';

export default function Chat() {
  // chatting header, scroll setting
  const { roomName, scrollRef, otherNickname } = useChatPageModel();
  const UserId = '김말이'; // 사용자 PK

  // message list
  const [messages, setMessages] = useState<MessageFormType[]>([]);
  const handleAddMessages = (message: MessageFormType[]): void => {
    // client 객체에 props로 넘기는 message setter
    setMessages(message);
  };

  // webSocket Client
  const socketClient = useSocketClientModel(UserId, handleAddMessages);

  return (
    <div className="flex flex-col h-screen">
      {/* 상단 헤더 + 원본 게시글 미리보기 영역 (Header + OriginBoard) */}
      <div className="fixed top-0 w-full bg-white z-10 max-w-[500px]">
        <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
        <OriginBoard />
      </div>

      {/* 대화 내용 (Dialogs) */}
      <div
        className="flex-1 mt-[25vh] pb-[8vh] overflow-y-scroll"
        ref={scrollRef}
      >
        <Dialogs messages={messages} otherNickname={otherNickname} />
      </div>

      {/* 메시지 입력창 (ChatWindow) */}
      <div className="fixed bottom-0 box-border w-full bg-white z-10 max-w-[500px]">
        <ChatWindow client={socketClient} />
      </div>
    </div>
  );
}
