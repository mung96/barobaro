'use client';

import useSocketClientModel from '@/hooks/message/chat/useSocketClientModel';
import useChatPageModel from '@/hooks/message/chat/useChatPageModel';
import PageTransition from '@/components/shared/PageTransition';
import { ProcessProvider } from '@/contexts/ChatProcessContext';
import { SocketClientProvider } from '@/contexts/SocketClientContext';
import { OpponentProvider } from '@/contexts/ChatOpponentUserInfoContext';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('@/components/Header'));
const OriginBoard = lazy(() => import('@/components/message/chat/OriginBoard'));
const Dialogs = lazy(() => import('@/components/message/chat/Dialogs'));
const ChatWindow = lazy(() => import('@/components/message/chat/ChatWindow'));

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
    ownerUuid,
  } = useChatPageModel();

  // webSocket Client
  const { socketClient, sendChat } = useSocketClientModel(handleAddMessages, chatRoomId);

  // socketClient가 null일 때 렌더링
  if (!socketClient) {
    return <div>Loading...</div>;
  }

  return (
<SocketClientProvider value={{ socketClient, sendChat, chatRoomId }}>
      <OpponentProvider value={{ otherNickname, otherUuid, ownerUuid }}>
        <ProcessProvider value={{ process, processSetter }}>
          <PageTransition direction="forward" step="g">
            <div className="flex flex-col h-screen">
              {/* 상단 헤더 + 원본 게시글 미리보기 영역 (Header + OriginBoard) */}
              <Suspense>
                <div className="fixed top-0 w-full bg-white z-10 max-w-[500px]">
                  <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
                  <OriginBoard />
                </div>
              </Suspense>

              {/* 대화 내용 (Dialogs) */}
              <Suspense>
                <div className="flex-1 mt-[25vh] overflow-y-scroll" ref={scrollRef}>
                  <Dialogs messages={messages} otherNickname={otherNickname} />
                </div>
              </Suspense>

              {/* 메시지 입력창 (ChatWindow) */}
              <Suspense>
                <div className="fixed bottom-0 box-border w-full bg-white z-10 max-w-[500px]">
                  <ChatWindow />
                </div>
              </Suspense>
            </div>
          </PageTransition>
        </ProcessProvider>
      </OpponentProvider>
    </SocketClientProvider>
  );
}
