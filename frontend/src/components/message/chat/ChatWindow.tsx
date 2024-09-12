'use client';

import AttatchImage from '@/components/(SVG_component)/(message)/(chat)/AttatchImage';
import SendButton from '@/components/(SVG_component)/(message)/(chat)/SendButton';
import { ChangeEvent, useState, useEffect, useRef } from 'react';

export default function ChatWindow() {
  const [chatValue, setChatValue] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleChatValue = (e: ChangeEvent<HTMLInputElement>) => {
    setChatValue(e.target.value);
    setActive(e.target.value !== '');
  };

  useEffect(() => {
    const handleResize = () => {
      const isKeyboardVisible =
        window.innerHeight < document.documentElement.clientHeight;
      setKeyboardVisible(isKeyboardVisible);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.style.transform = keyboardVisible
        ? 'translateY(-100px)' // Adjust this value based on your needs
        : 'translateY(0)';
    }
  }, [keyboardVisible]);

  return (
    <div ref={chatWindowRef} className="fixed bottom-0 w-full bg-gray-400 p-2">
      <div className="w-full h-[6vh] flex justify-center">
        <div className="w-[95%] h-full flex items-center justify-around rounded-2xl border border-gray-500 bg-gray-400">
          <AttatchImage className="w-2/12" />
          <input
            type="text"
            className="w-8/12 bg-gray-400"
            onChange={handleChatValue}
            value={chatValue}
          />
          <SendButton active={active} className="w-2/12" />
        </div>
      </div>
      {keyboardVisible || <div className="w-full h-[7vh]">&emsp;</div>}
    </div>
  );
}
