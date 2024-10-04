'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import BorrowSVG from '@/components/(SVG_component)/(mypage)/Borrow';
import LentSVG from '@/components/(SVG_component)/(mypage)/Lent';
import ConnectAccountSVG from '@/components/(SVG_component)/(mypage)/ConnectAccount';
import ChangePasswordSVG from '@/components/(SVG_component)/(mypage)/ChangePassword';
import AlarmSVG from '@/components/(SVG_component)/(mypage)/Alarm';
import AccountBottomSheet from '@/components/(bottomsheet)/AccountBottomSheet';
import useCurrentStore from '@/store/useCurrentStore';
import { ItemListType } from '@/types/products/products';
import { faker } from '@faker-js/faker';

export default function MyPageContent() {
  const [isBottomSheetOpen, SetIsBottomSheetOpen] = useState(false);
  const openBottomSheet = () => SetIsBottomSheetOpen(true);
  const closeBottomSheet = () => SetIsBottomSheetOpen(false);
  const { setBorrowList, setLentList } = useCurrentStore();

  useEffect(() => {
    // 초기 데이터 생성 함수
    const createInitialData = (): {
      borrow: ItemListType;
      lent: ItemListType;
    } => ({
      borrow: [
        {
          productId: faker.number.int(9999),
          productMainImage: faker.image.urlLoremFlickr(),
          title: 'Borrowed Item 1',
          startDate: faker.date.recent().toLocaleDateString('ko-KR'),
          endDate: faker.date.recent().toLocaleDateString('ko-KR'),
          rentalFee: Number(
            faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
          ),
          productStatus: 'IN_PROGRESS',
        },
        // 필요한 만큼 더 추가
      ],
      lent: [
        {
          productId: faker.number.int(9999),
          productMainImage: faker.image.urlLoremFlickr(),
          title: 'Lent Item 1',
          startDate: faker.date.recent().toLocaleDateString('ko-KR'),
          endDate: faker.date.recent().toLocaleDateString('ko-KR'),
          rentalFee: Number(
            faker.commerce.price({ min: 1000, max: 100000, dec: 0 }),
          ),
          productStatus: 'FINISH',
        },
        // 필요한 만큼 더 추가
      ],
    });

    // 초기 데이터 생성 및 저장소에 설정
    const initialData = createInitialData();
    setBorrowList(initialData.borrow);
    setLentList(initialData.lent);
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  return (
    <>
      <section>
        <div className="ml-5 mt-4 mb-4">
          <h2 className="text-[14px] font-bold text-[#6E7074]">
            거래 현황 조회
          </h2>
          <div className="flex flex-col items-start m-3">
            <Link href="/mypage/current/borrow">
              <button
                className="flex flex-row justify-center items-center my-1"
                type="button"
              >
                <BorrowSVG />
                <p className="text-xs text-black-100">빌린 내역</p>
              </button>
            </Link>
            <Link href="/mypage/current/lent">
              <button
                className="flex flex-row justify-center items-center my-1"
                type="button"
              >
                <LentSVG />
                <p className="text-xs text-black-100">빌려준 내역</p>
              </button>
            </Link>
          </div>
        </div>
        <div className="ml-5 mt-4 mb-4">
          <h2 className="text-[14px] font-bold text-[#6E7074]">
            결제 수단 관리
          </h2>
          <div className="flex flex-col items-start m-3">
            <button
              type="button"
              className="flex flex-row justify-center items-center my-1"
              onClick={openBottomSheet}
            >
              <ConnectAccountSVG />
              <p className="text-xs text-black-100">계좌 설정</p>
            </button>
          </div>
        </div>
        <div className="ml-5 mt-4 mb-4">
          <h2 className="text-[14px] font-bold text-[#6E7074]">회원 관리</h2>
          <div className="flex flex-col items-start m-3">
            <Link href="/mypage/user/password">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <ChangePasswordSVG />
                <p className="text-xs text-black-100">비밀번호 설정</p>
              </button>
            </Link>
            <Link href="/mypage/alarm">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <AlarmSVG />
                <p className="text-xs text-black-100">알림 설정</p>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <AccountBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        closeBottomSheet={closeBottomSheet}
        BottomSheetType="selectMainAccount"
      />
    </>
  );
}
