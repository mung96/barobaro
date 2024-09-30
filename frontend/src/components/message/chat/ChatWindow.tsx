'use client';

import AttatchImage from '@/components/(SVG_component)/(message)/(chat)/AttatchImage';
import SendButton from '@/components/(SVG_component)/(message)/(chat)/SendButton';
import webSocketClient from '@/utils/webSocketClient';
import useChatWindowModel from '@/hooks/message/chat/useChatWindowModel';

type ChatWindowParam = {
  client: webSocketClient | null;
};
export default function ChatWindow({ client }: ChatWindowParam) {
  const { chatValue, messageRef, handleChatValue, sendChat, handleEnterPress } =
    useChatWindowModel(client);

  return (
    <div className="box-border ">
      <div className=" bg-white p-2">
        <div className="w-full h-[6vh] flex justify-center">
          <div className="w-[95%] h-full flex items-center justify-around rounded-2xl border border-gray-500 bg-gray-400 box-border">
            <AttatchImage className="w-2/12" />
            <input
              type="text"
              className="w-8/12 bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-30"
              onChange={handleChatValue}
              value={chatValue}
              ref={messageRef}
              onKeyDown={handleEnterPress}
            />
            <button
              onClick={sendChat}
              role="presentation"
              className="w-2/12 focus:outline-none"
              disabled={!chatValue}
            >
              <SendButton active={!!chatValue} className="w-full" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
