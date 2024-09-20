'use client';

import AttatchImage from '@/components/(SVG_component)/(message)/(chat)/AttatchImage';
import SendButton from '@/components/(SVG_component)/(message)/(chat)/SendButton';
import { ChangeEvent, useState } from 'react';

export default function ChatWindow() {
  const [chatValue, setChatValue] = useState('');
  const [active, setActive] = useState(false);

  const handleChatValue = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
    setActive(e.target.value !== '');
  };

  return (
    <div>
      <div className="w-[100vw] bg-white p-2">
        <div className="w-full h-[6vh] flex justify-center">
          <div className="w-[95%] h-full flex items-center justify-around rounded-2xl border border-gray-500 bg-gray-400">
            <AttatchImage className="w-2/12" />
            <input
              type="text"
              className="w-8/12 bg-gray-400"
              onChange={handleChatValue}
              value={chatValue}
            />
            <SendButton active={!!chatValue} className="w-2/12" />
          </div>
        </div>
      </div>
    </div>
  );
}
