'use client';

import { MouseEvent, useState } from 'react';
import colors from '@/components/colors';
import HeartIcon from './HeartIcon';

export default function LikeButton({ isWished }: { isWished: boolean }) {
  // 좋아요 목록에 있는 것을 파악하고, 하트를 누른 상태로 하도록!
  const isInLikeList = isWished;
  const [isClicked, setClicked] = useState(isInLikeList);
  const heartFillColor = isClicked ? colors.blue[200] : 'none';
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setClicked(!isClicked);
    // 이곳에 API로 좋아요 리스트 반영 구현
  };

  return (
    <button onClick={handleClick} type="button">
      <HeartIcon fill={heartFillColor} />
    </button>
  );
}
