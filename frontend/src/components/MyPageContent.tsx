'use client';

import Link from 'next/link';
import { useState } from 'react';
import BorrowSVG from '@/components/(SVG_component)/(mypage)/Borrow';
import LentSVG from '@/components/(SVG_component)/(mypage)/Lent';
import ConnectAccountSVG from '@/components/(SVG_component)/(mypage)/ConnectAccount';
import VerificationSVG from '@/components/(SVG_component)/(mypage)/Verification';
import ChangePasswordSVG from '@/components/(SVG_component)/(mypage)/ChangePassword';
import AlarmSVG from '@/components/(SVG_component)/(mypage)/Alarm';
import FAQSVG from '@/components/(SVG_component)/(mypage)/FAQ';
import TermsofUseSVG from '@/components/(SVG_component)/(mypage)/TermsofUse';
import AccountBottomSheet from '@/components/(bottomsheet)/AccountBottomSheet';

export default function MyPageContent() {
  const [isBottomSheetOpen, SetIsBottomSheetOpen] = useState(false);
  const openBottomSheet = () => SetIsBottomSheetOpen(true);
  const closeBottomSheet = () => SetIsBottomSheetOpen(false);

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
            {/* <Link href="/mypage/payment/main_account"> */}
            {/*  <button */}
            {/*    type="button" */}
            {/*    className="flex flex-row justify-center items-center my-1" */}
            {/*  > */}
            {/*    <MainAccountSVG /> */}
            {/*    <p className="text-xs text-black-100">대표 계좌 설정</p> */}
            {/*  </button> */}
            {/* </Link> */}
            <button
              type="button"
              className="flex flex-row justify-center items-center my-1"
              onClick={openBottomSheet}
            >
              <ConnectAccountSVG />
              <p className="text-xs text-black-100">계좌 설정</p>
            </button>
            {/* <Link href="/mypage/payment/idontknow"> */}
            {/*  <button */}
            {/*    type="button" */}
            {/*    className="flex flex-row justify-center items-center my-1" */}
            {/*  > */}
            {/*    <p className="text-xs text-black-100"> */}
            {/*      페이 설정 (수정 완료시 주소, 아이콘 설정 마무리하기) */}
            {/*    </p> */}
            {/*  </button> */}
            {/* </Link> */}
          </div>
        </div>
        <div className="ml-5 mt-4 mb-4">
          <h2 className="text-[14px] font-bold text-[#6E7074]">회원 관리</h2>
          <div className="flex flex-col items-start m-3">
            <Link href="/mypage/user/verification">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <VerificationSVG />
                <p className="text-xs text-black-100">본인 인증</p>
              </button>
            </Link>
            <Link href="/mypage/user/password">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <ChangePasswordSVG />
                <p className="text-xs text-black-100">
                  비밀번호 설정(추후 등록 기록 O : 수정, X : 등록 로직 구현)
                </p>
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
        <div className="ml-5 mt-4 mb-[56px]">
          <h2 className="text-[14px] font-bold text-[#6E7074]">고객센터</h2>
          <div className="flex flex-col items-start m-3">
            <Link href="/mypage/help/question">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <FAQSVG />
                <p className="text-xs text-black-100">자주 묻는 질문</p>
              </button>
            </Link>
            <Link href="/mypage/help/terms">
              <button
                type="button"
                className="flex flex-row justify-center items-center my-1"
              >
                <TermsofUseSVG />
                <p className="text-xs text-black-100">약관 및 정책</p>
              </button>
            </Link>
          </div>
        </div>
      </section>
      <AccountBottomSheet
        isBottomSheetOpen={isBottomSheetOpen}
        closeBottomSheet={closeBottomSheet}
      />
    </>
  );
}
