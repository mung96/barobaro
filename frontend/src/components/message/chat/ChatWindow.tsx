'use client';

import AttatchImage from '@/components/(SVG_component)/(message)/(chat)/AttatchImage';
import SendButton from '@/components/(SVG_component)/(message)/(chat)/SendButton';
import { ChangeEvent, useRef, useState } from 'react';

export default function ChatWindow() {
  const [chatValue, setChatValue] = useState('');
  let message: string;
  const messageRef = useRef<HTMLInputElement>(null);

  const handleChatValue = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
  };

  const sendChat = () => {
    setChatValue('');
    messageRef.current?.focus();
  };

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
