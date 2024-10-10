'use client';

import Header from '@/components/Header';
import OriginBoard from '@/components/message/chat/OriginBoard';
import Dialogs from '@/components/message/chat/Dialogs';
import ChatWindow from '@/components/message/chat/ChatWindow';
import useSocketClientModel from '@/hooks/message/chat/useSocketClientModel';
import useChatPageModel from '@/hooks/message/chat/useChatPageModel';
import PageTransition from '@/components/shared/PageTransition';
import { ProcessProvider } from '@/contexts/ChatProcessContext';
import { SocketClientProvider } from '@/contexts/SocketClientContext';
import { OpponentContext } from '@/contexts/ChatOpponentUserInfoContext';

export default function Chat() {
  // chatting header, scroll setting
  const {
    process,
    processSetter,
    messages,
    handleAddMessages,
    roomName,
    scrollRef, // processSetter
    otherNickname,
    otherUuid,
    chatRoomId,
  } = useChatPageModel();

  // webSocket Client
  const { socketClient, sendChat } = useSocketClientModel(handleAddMessages, chatRoomId);

  // socketClient가 null일 때 렌더링
  if (!socketClient) {
    return <div>Loading...</div>;
  }

  return (
    <SocketClientProvider value={{ socketClient, sendChat, chatRoomId }}>
      <ProcessProvider value={{ process, processSetter }}>
        <PageTransition direction="forward" step="g">
          <div className="flex flex-col h-screen">
            {/* 상단 헤더 + 원본 게시글 미리보기 영역 (Header + OriginBoard) */}
            <div className="fixed top-0 w-full bg-white z-10 max-w-[500px]">
              <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
              <OriginBoard />
            </div>

            {/* 대화 내용 (Dialogs) */}
            <div className="flex-1 mt-[25vh] overflow-y-scroll" ref={scrollRef}>
              <Dialogs messages={messages} otherNickname={otherNickname} />
            </div>

            {/* 메시지 입력창 (ChatWindow) */}
            <div className="fixed bottom-0 box-border w-full bg-white z-10 max-w-[500px]">
              {/* <ChatWindow client={socketClient} /> */}
              <ChatWindow />
            </div>
          </div>
        </PageTransition>
      </ProcessProvider>
    </SocketClientProvider>
  );
}
