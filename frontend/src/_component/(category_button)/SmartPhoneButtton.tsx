'use client';

import colors from '@/_component/colors';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SmartPhone from '../(SVG_component)/SmartPhone';

export default function SmartPhoneButton() {
  const [isClicked, setIsClicked] = useState(false);
  const buttonColor = isClicked ? colors.white[100] : colors.black[100];
  const buttonFillColor = isClicked ? colors.blue[100] : colors.gray[100];
  const backgroundColor = colors.gray[100];
  const router = useRouter();
  const handleClick = (delay:number) => {
    setIsClicked(!isClicked);
    setTimeout(() => {
      router.push('/search/category/smartphone');
    }, delay);
  };
  console.log(backgroundColor);
  return (
    <button
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
