'use client';

import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import { CurrentProduct } from '@/types/products/products';

export default function Card({ cardInfo }: { cardInfo: CurrentProduct }) {
  const router = useRouter();
  const cardHandler = () => {
    router.push(`/post/${cardInfo.productId}`);
    console.log('click');
    console.log(cardInfo.productId);
  };
  return (
    <div>
      <div
        onClick={() => cardHandler()}
        role="button"
        tabIndex={0}
        className="w-[125px] h-[168px] rounded-[10px] bg-red-50 items-center relative overflow-hidden cursor-pointer"
      >
        <div className="z-10 absolute top-2 right-2">
          <LikeButton isWished={cardInfo.isWished} />
        </div>
        <Image
          src={cardInfo.productMainImage}
          alt={`Product: ${cardInfo.title}`}
          fill
        />
      </div>
      <div>
        <p className="text-xs font-bold">{cardInfo.title}</p>
      </div>
      <div>
        <p className="text-[10px]">
          {cardInfo.startDate}~{cardInfo.endDate}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold">
          {cardInfo.rentalFee}
          원/일
        </p>
      </div>
    </div>
  );
}
