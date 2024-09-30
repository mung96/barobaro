'use client';

import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LikeButton from '@/components/(SVG_component)/LikeButton';

interface CardData {
  url: string;
  date: string;
  price: string;
  content: string;
  fakeId: number;
}

export default function Card() {
  const router = useRouter();
  const [cardData, setCardData] = useState<CardData | null>(null);

  useEffect(() => {
    setCardData({
      url: faker.image.urlLoremFlickr(),
      date: faker.date.recent().toLocaleDateString('ko-KR'),
      price: faker.commerce.price({ min: 1000, max: 10000, dec: 0 }),
      content: faker.commerce.product(),
      fakeId: faker.number.int(999),
    });
  }, []);

  function handleCard() {
    if (cardData) {
      router.push(`/post/${cardData.fakeId}`);
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCard();
    }
  }

  if (!cardData) {
    return <div>Loading...</div>; // 또는 스켈레톤 UI
  }

  return (
    <div>
      <div
        onClick={handleCard}
        onKeyDown={() => handleKeyDown}
        role="button"
        tabIndex={0}
        className="w-[125px] h-[168px] rounded-[10px] bg-red-50 items-center relative overflow-hidden cursor-pointer"
      >
        <div className="z-10 absolute top-2 right-2">
          <LikeButton />
        </div>
        <Image src={cardData.url} alt={`Product: ${cardData.content}`} fill />
      </div>
      <div>
        <p className="text-[10px]">{cardData.date}</p>
      </div>
      <div>
        <p className="text-xs font-bold">
          {cardData.price}
          원/일
        </p>
      </div>
      <div>
        <p className="text-xs">{cardData.content}</p>
      </div>
    </div>
  );
}
