'use client';

import Image from 'next/image';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import ContractIcon from '@/components/(SVG_component)/(mypage)/Contract';
import MeatBallsButton from '@/components/(SVG_component)/(mypage)/MeatBallsButton';
import HeartIcon from '@/components/(SVG_component)/HeartIcon';
import Link from 'next/link';
import { useBorrowProducts, useLentProducts, useLikeProducts } from '@/store/useCurrentStore';

export default function ItemList({ data }: { data: string }) {
  // 주어진 data에 맞게 List를 받고, 이를 하단의 return 에 맞춰 들어가도록 해야함.
  // let 으로 정의한건 추후 수정예정.
  const borrowProducts = useBorrowProducts();
  const lentProducts = useLentProducts();
  const likeProducts = useLikeProducts();
  let result;
  let title;
  if (data === 'borrow') {
    result = borrowProducts;
    title = '빌린 물품 내역';
  } else if (data === 'lent') {
    result = lentProducts;
    title = '빌려준 물품 내역';
  } else if (data === 'like') {
    result = likeProducts;
  }
  return (
    <section>
      <header className="my-3">
        <h1 className="text-[15px] font-bold text-center">{title}</h1>
      </header>
      {result &&
        result.map((item: any) => (
          <div key={item.productId}>
            <div className="flex flex-row ml-3.5">
              <div className="w-[98px] h-[98px] rounded-[10px] overflow-hidden relative">
                <Link href={`/post/${item.productId}`}>
                  <Image src={`/${item.productMainImage}`} alt="product_image" fill />
                </Link>
                <div
                  className={`bg-amber-200 w-[48px] h-[20px] flex justify-center items-center rounded-[3px] absolute left-[4px] top-[4px] ${item.boolean === true ? 'bg-gray-500' : 'bg-gray-300'}`}
                >
                  <p className="text-[10px]">
                    {item.productStatus === 'FINISH' ? '거래완료' : '거래중'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center items-start ms-3.5 relative w-[100%]">
                <Link href={`/post/${item.productId}`}>
                  <h1 className="text-[15px]">{item.title}</h1>
                  <div className="flex flex-row">
                    <CalendarSVG />
                    <p className="text-xs">
                      {' '}
                      {item.startDate} ~ {item.endDate}{' '}
                    </p>
                  </div>
                  <p className="text-[16px] font-bold">
                    {item.rentalFee}
                    원/일
                  </p>
                </Link>
                <div className="flex flex-row w-full">
                  <button
                    type="button"
                    className="w-[68px] h-[22px] bg-gray-400 rounded-[3px] flex flex-row justify-center items-center mt-4"
                  >
                    <ContractIcon />
                    <p className="text-[10px] text-gray-600">계약서보기</p>
                  </button>
                  <div className="flex flex-1" />
                  <div className="flex flex-row mr-4 mt-4 items-center">
                    <div className="mx-1">
                      <HeartIcon fill="none" />
                    </div>
                    <p className="text-[12px] text-gray-200 mt-[1px]">{item.wishCount}</p>
                  </div>
                </div>
                <MeatBallsButton data={item.id} />
              </div>
            </div>
            <div className="flex justify-center my-5">
              <div className="bg-gray-500 h-[1px] max-w-[450px] w-[92dvw]" />
            </div>
          </div>
        ))}
      <div className="h-4" />
    </section>
  );
}
