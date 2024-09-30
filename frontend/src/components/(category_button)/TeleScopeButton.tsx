'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import colors from '@/components/colors';
import TeleScope from '../(SVG_component)/TeleScope';

export default function TeleScopeButton() {
  const [isClicked, setIsClicked] = useState(false);
  const buttonColor = isClicked ? colors.white[100] : colors.black[100];
  const buttonFillColor = isClicked ? colors.blue[100] : colors.gray[100];
  const router = useRouter();
  const handleClick = (delay: number) => {
    setIsClicked(!isClicked);
    setTimeout(() => {
      router.push('/search/category/telescope');
    }, delay);
  };
  // console.log(backgroundColor);
  return (
    <button
      type="button"
      onClick={() => handleClick(500)}
      style={{
        backgroundColor: buttonFillColor,
        borderRadius: '12px',
        width: '44px',
        height: '44px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TeleScope fill={buttonColor} />
    </button>
  );
}
