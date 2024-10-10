'use client';

import Link from 'next/link';
import { useState } from 'react';
import BorrowSVG from '@/components/(SVG_component)/(mypage)/Borrow';
import LentSVG from '@/components/(SVG_component)/(mypage)/Lent';
import ConnectAccountSVG from '@/components/(SVG_component)/(mypage)/ConnectAccount';
import ChangePasswordSVG from '@/components/(SVG_component)/(mypage)/ChangePassword';
import AlarmSVG from '@/components/(SVG_component)/(mypage)/Alarm';
import AccountBottomSheet from '@/components/(bottomsheet)/AccountBottomSheet';
import useGetUserInfoInit from "@/hooks/user/useGetUserInfoInit";
import { useBottomSheetAction, useBottomSheetState } from "@/store/useBottomSheetStore";

export default function MyPageContent() {
  const setBottomSheetAction = useBottomSheetAction();
  const bottomSheetState = useBottomSheetState();
  useGetUserInfoInit()
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
              onClick={setBottomSheetAction.setIsOpen}
            >
              <ConnectAccountSVG />
              <p className="text-xs text-black-100">계좌 설정</p>
            </button>
          </div>
        </div>
        <div className="ml-5 mt-4 mb-4">
          <h2 className="text-[14px] font-bold text-[#6E7074]">회원 관리</h2>
          <div className="flex flex-col items-start m-3">
            <Link href="/mypage/user/password/new">
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
        isBottomSheetOpen={bottomSheetState}
        closeBottomSheet={setBottomSheetAction.setIsClose}
        BottomSheetType="selectMainAccount"
      />
    </>
  );
}
