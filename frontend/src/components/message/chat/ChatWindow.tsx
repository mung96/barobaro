'use client';

import SendButton from '@/components/(SVG_component)/(message)/(chat)/SendButton';
import webSocketClient from '@/utils/webSocketClient';
import useChatWindowModel from '@/hooks/message/chat/useChatWindowModel';
import useChatFileModel from '@/hooks/message/chat/useChatFileModel';
import ChatImageList from './ChatImageList';
import ChatImageAdd from './ChatImageAdd';
import { useContext } from 'react';
import { SocketClientContext } from '@/contexts/SocketClientContext';

// type ChatWindowParam = {
//   client: webSocketClient | null;
// };
// export default function ChatWindow({ client }: ChatWindowParam) {

export default function ChatWindow() {
  const context = useContext(SocketClientContext);
  if (!context) return null;
  const { socketClient } = context;

  const { chatValue, messageRef, handleChatValue, sendChat, handleEnterPress } =
    // useChatWindowModel(client);
    useChatWindowModel(socketClient);

  const {
    files,
    changeFile,
    //  handleDragEnd, // 채팅 사진 리스트 내에서는 드래그 기능 사용 X (너무 작음)
    deleteFileByIndex,
    activeTextArea, // text 채팅을 사용하는지 여부 (이미지가 있으면 false)
    chatWarning, // 이미지 관련 warning 표시
    warningHandler,
  } = useChatFileModel();

  return (
    <div className="box-border ">
      <div className=" bg-white p-2">
        <div className="w-full h-[6vh] flex justify-center">
          <div className="w-[95%] h-full flex items-center justify-around rounded-2xl border border-gray-500 bg-gray-400 box-border">
            <div className="flex items-center justify-center w-2/12">
              <ChatImageAdd width="56px" height="56px" addFile={changeFile} />
            </div>
            {activeTextArea ? (
              <input
                type="text"
                className="w-8/12 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30"
                onChange={handleChatValue}
                value={chatValue}
                ref={messageRef}
                onKeyDown={handleEnterPress}
                placeholder={chatWarning || ''}
                onFocus={() => warningHandler('')}
              />
            ) : (
              <div className="w-8/12">
                <ChatImageList
                  width="40px"
                  height="40px"
                  images={files}
                  deleteFile={deleteFileByIndex}
                  //      dropEnd={handleDragEnd}
                />
              </div>
            )}
            <button
              type="button"
              onClick={sendChat}
              className="w-2/12 focus:outline-none"
              disabled={!chatValue}
            >
              <SendButton
                active={!!chatValue || !activeTextArea}
                className="w-full"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
