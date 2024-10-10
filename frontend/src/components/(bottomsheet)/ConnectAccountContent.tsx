'use client';

import AccountCarousel from '@/components/(bottomsheet)/AccountCarousel';
import {useBottomSheetAction, useSelectedAccount} from "@/store/useBottomSheetStore";

type Props = {
  BottomSheetTitle: string;
};

export default function ConnectAccountContent({ BottomSheetTitle }: Props) {
  const pivot = useSelectedAccount();
  const cancleEvent = useBottomSheetAction().setIsClose;
  const mainAccountRequest = () => {
      console.log('gogogogo');
      cancleEvent();
  }
  return (
    <section className="flex flex-col h-[360px]">
      <section className="mb-3">
        <div className="flex flex-row justify-center">
          <h2 className="text-xl font-bold">
            {BottomSheetTitle === 'selectMainAccount'
              ? '주 계좌를 선택해주세요.'
              : '결제할 수단을 선택해주세요.'}
          </h2>
          <button type="button" className="absolute right-0 mr-3 text-blue-500">
            추가
          </button>
        </div>
      </section>
      <div className="flex flex-1">
        <AccountCarousel />
      </div>
      <section className="flex">
        <div className="w-full flex justify-evenly">
          <button
            type="button"
            className="bg-gray-500 w-[40%] h-[50px] rounded-[10px] text-white"
            onClick={cancleEvent}
          >
            취소
          </button>
          <button
            type="button"
            className={`w-[40%] h-[50px] rounded-[10px] text-white ${pivot === 0 ? 'bg-gray-500 disabled' : 'bg-blue-500'}`}
            onClick={mainAccountRequest}
          >
            적용
          </button>
        </div>
      </section>
    </section>
  );
}
