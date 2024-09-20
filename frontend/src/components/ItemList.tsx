'use client';

import { faker } from '@faker-js/faker';
import Image from 'next/image';
import CalendarSVG from '@/components/(SVG_component)/Calendar';
import ContractIcon from '@/components/(SVG_component)/(mypage)/Contract';
import ThreeDot from "@/components/(SVG_component)/(mypage)/ThreeDot";

export default function ItemList({ data } : { data : string }) {
  const borrowList : {
    id: number,
    title: string,
    price: string,
    start: string,
    end: string,
    image: string,
    boolean: boolean,
  }[] = [
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Borrow',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
  ];
  const lentList : {
    id: number,
    title: string,
    price: string,
    start: string,
    end: string,
    image: string,
    boolean: boolean,
  }[] = [
    {
      id: faker.number.int(9999),
      title: '날짜양식은 나중에 수정예정',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent1',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
    {
      id: faker.number.int(9999),
      title: 'Lent',
      price: faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
      start: faker.date.recent().toLocaleDateString('ko-KR'),
      end: faker.date.recent().toLocaleDateString('ko-KR'),
      image: faker.image.urlLoremFlickr(),
      boolean: faker.datatype.boolean(),
    },
  ];
  let result = null;
  let title = null;
  if (data === 'borrow') {
    result = borrowList;
    title = '빌린 물품 내역';
  } else if (data === 'lent') {
    result = lentList;
    title = '빌려준 물품 내역';
  }

  return (
    <section>
      <header className="my-3">
        <h1 className="text-[15px] font-bold text-center">{title}</h1>
      </header>
      {result && result.map((item : any) => (
        <div key={item.id}>
          <div className="flex flex-row ml-3.5">
            <div className="w-[98px] h-[98px] rounded-[10px] overflow-hidden relative">
              <Image src={item.image as string} alt="product_image" fill/>
              <div
                  className={`bg-amber-200 w-[48px] h-[20px] flex justify-center items-center rounded-[3px] absolute left-[4px] top-[4px] ${item.boolean === true ? 'bg-gray-500' : 'bg-gray-300'}`}>
                <p className="text-[10px]">{item.boolean === true ? '거래완료' : '거래중'}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start ms-3.5 relative w-[100%]">
              <h1 className="text-[15px]">{item.title}</h1>
              <div className="flex flex-row">
                <CalendarSVG/>
                <p className="text-xs">
                {' '}
                  {item.start}
                  {' '}
                  ~
                  {' '}
                  {item.end}
                  {' '}
                </p>
              </div>
              <p className="text-[16px] font-bold">
                {item.price}
                원/일
              </p>
              <button type="button" className="w-[68px] h-[22px] bg-gray-400 rounded-[3px] flex flex-row justify-center items-center">
                <ContractIcon />
                <p className="text-[10px] text-gray-600">계약서보기</p>
              </button>
              {data === 'lent' ? <div className="absolute flex justify-center items-center right-[8dvw] top-[4px] bg-gray-500 w-[20px] h-[18px] rounded-[3px]">
                <ThreeDot/>
              </div> : null}
            </div>
          </div>
          <div className="flex justify-center my-5">
            <div className="bg-gray-500 h-[1px] w-[92dvw]" />
          </div>
        </div>
      ))}
      <div className="h-4" />
    </section>
  );
}
