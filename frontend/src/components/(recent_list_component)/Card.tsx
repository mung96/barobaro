'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LikeButton from '@/components/(SVG_component)/LikeButton';
import formatCost from '@/utils/formatCost';

export default function Card({ cardInfo }: { cardInfo: any }) {
  const router = useRouter();
  const cardHandler = () => {
    router.push(`/post/${cardInfo.productId}`);
    console.log('click');
    console.log(cardInfo.productId);
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        onClick={() => cardHandler()}
        role="button"
        tabIndex={0}
        className="w-[125px] h-[168px] rounded-[10px] bg-gray-500 items-center relative overflow-hidden cursor-pointer"
      >
        <div className="z-10 absolute top-2 right-2">
          <LikeButton isWished={cardInfo.isWished} productId={cardInfo.productId.toString()} />
        </div>
        {/*TODO : unoptimized false로도 이미지를 구현하는 방법 알아보기*/}
        <Image src={cardInfo.productMainImage} alt={`Product: ${cardInfo.title}`} fill unoptimized={true} />
      </div>
      <div>
        <p className="text-xs font-bold">
          {cardInfo.title.length > 10 ? `${cardInfo.title.slice(0, 9)}...` : cardInfo.title}
        </p>
      </div>
      <div>
        <p className="text-[10px]">
          {cardInfo.startDate}~{cardInfo.endDate}
        </p>
      </div>
      <div>
        <p className="text-xs font-bold">
          {formatCost(cardInfo.rentalFee)}
          원/일
        </p>
      </div>
    </div>
  );
}
