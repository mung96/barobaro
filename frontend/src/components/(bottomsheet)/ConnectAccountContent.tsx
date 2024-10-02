import AccountCarousel from '@/components/(bottomsheet)/AccountCarousel';

type Props = {
  BottomSheetTitle: string;
};

export default function ConnectAccountContent({ BottomSheetTitle }: Props) {
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
          >
            취소
          </button>
          <button
            type="button"
            className="bg-blue-500 w-[40%] h-[50px] rounded-[10px] text-white"
          >
            적용
          </button>
        </div>
      </section>
    </section>
  );
}
