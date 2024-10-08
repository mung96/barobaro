'use client';

import { MouseEvent, useState } from 'react';
import colors from '@/components/colors';
import HeartIcon from './HeartIcon';
import {getWishDeleteApi, getWishPostApi} from "@/apis/wishListApi";

export default function LikeButton({ isWished, productId }: { isWished: boolean, productId: string }) {
  // 좋아요 목록에 있는 것을 파악하고, 하트를 누른 상태로 하도록!
  // TODO : 클릭하면 이벤트가 실행되고,  true => delete, false => post
  const isInLikeList = isWished;
  const [isClicked, setClicked] = useState(isInLikeList);
  const heartFillColor = isClicked ? colors.blue[200] : 'none';
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isClicked) {
      getWishDeleteApi(productId)
      setClicked(false)
    } else {
      getWishPostApi(productId)
      setClicked(true)
    }
  };

  return (
    <button onClick={handleClick} type="button">
      <HeartIcon fill={heartFillColor} />
    </button>
  );
}
