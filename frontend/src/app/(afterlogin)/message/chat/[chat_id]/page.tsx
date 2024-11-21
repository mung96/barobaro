'use client';

import useSocketClientModel from '@/hooks/message/chat/useSocketClientModel';
import useChatPageModel from '@/hooks/message/chat/useChatPageModel';
import PageTransition from '@/components/shared/PageTransition';
import { ProcessProvider } from '@/contexts/ChatProcessContext';
import { SocketClientProvider } from '@/contexts/SocketClientContext';
import { OpponentProvider } from '@/contexts/ChatOpponentUserInfoContext';
import ChatProcessSetter from '@/components/message/chat/ChatProcessSetter';
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
    initProcess,
    originBoardParams,
    boardTitle,
  } = useChatPageModel();

  const { socketClient, sendChat, eventedProcess } = useSocketClientModel(handleAddMessages, chatRoomId, ownerUuid);

  if (!socketClient) {
    return <div>Loading...</div>;
  }

  return (
    <SocketClientProvider value={{ socketClient, sendChat, chatRoomId }}>
      <OpponentProvider value={{ otherNickname, otherUuid, ownerUuid, boardTitle }}>
        <ProcessProvider value={{ process, processSetter }}>
          <PageTransition direction="forward" step="g">
            <ChatProcessSetter fromChatPageModel={initProcess} fromSocketClientModel={eventedProcess} />
            <div className="flex flex-col h-screen">
              {/* 상단 헤더 + 원본 게시글 미리보기 영역 (Header + OriginBoard) */}
                <div className="fixed top-0 w-full bg-white z-50 max-w-[500px]">
                  <Header pageName={roomName} hasPrevBtn hasSearchBtn hasAlertBtn />
                </div>

                <div className="fixed top-[6vh] w-full bg-white z-50 max-w-[500px]">
                  <OriginBoard originBoardParams={originBoardParams} />
                </div>

              {/* 대화 내용 (Dialogs) */}
                <div className="flex flex-col pt-[25vh] overflow-y-auto" ref={scrollRef}>
                  <Dialogs messages={messages} />
                </div>

              {/* 메시지 입력창 (ChatWindow) */}
                <div className="fixed bottom-0 box-border w-full bg-white z-10 max-w-[500px]">
                  <ChatWindow />
                </div>
            </div>
          </PageTransition>
        </ProcessProvider>
      </OpponentProvider>
    </SocketClientProvider>
  );
}
