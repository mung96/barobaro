'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import colors from '@/components/colors';
import SmartPhone from '../(SVG_component)/SmartPhone';

export default function SmartPhoneButton() {
  const [isClicked, setIsClicked] = useState(false);
  const buttonColor = isClicked ? colors.white[100] : colors.black[100];
  const buttonFillColor = isClicked ? colors.blue[100] : colors.gray[100];
  const router = useRouter();
  const handleClick = (delay: number) => {
    setIsClicked(!isClicked);
    const queryParams = new URLSearchParams({
      category: 'smartphone',
      product: '',
    });
    setTimeout(() => {
      router.push(`/search?${queryParams.toString()}`);
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
      <SmartPhone fill={buttonColor} />
    </button>
  );
}
