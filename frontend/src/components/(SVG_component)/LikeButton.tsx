'use client';

import { MouseEvent, useState } from 'react';
import colors from '@/components/colors';
import HeartIcon from './HeartIcon';
import {getWishAddApi, getWishDeleteApi} from "@/apis/wishListApi";
import {useRecentlyActions} from "@/store/useRecentlyStore";
import {productListSelector} from "@/services/products/productselector";

export default function LikeButton({ isWished, productId }: { isWished: boolean, productId: string }) {
  // 좋아요 목록에 있는 것을 파악하고, 하트를 누른 상태로 하도록!
  const isInLikeList = isWished;
  const [isClicked, setClicked] = useState(isInLikeList);
  const heartFillColor = isClicked ? colors.blue[200] : 'none';
  const dataController = useRecentlyActions();
  // async function fetchData() {
  //   try {
  //     const uploaded = await productListSelector('recentlyUploaded');
  //     const viewed = await productListSelector('recentlyView')
  //     console.log('#####')
  //     console.log(uploaded, viewed)
  //     console.log(uploaded, viewed)
  //     dataController.setRecentlyUploadedProducts(uploaded);
  //     dataController.setRecentlyViewedProducts(viewed);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // }
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (isClicked) {
      getWishDeleteApi(productId)
      // fetchData()
      setClicked(false)

    } else {
      getWishAddApi(productId)
      // fetchData()
      setClicked(true)
    }
  };

  return (
    <button onClick={handleClick} type="button">
      <HeartIcon fill={heartFillColor} />
    </button>
  );
}
