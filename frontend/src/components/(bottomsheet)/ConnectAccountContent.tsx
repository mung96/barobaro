import AccountCarousel from '@/components/(bottomsheet)/AccountCarousel';

export default function ConnectAccountContent() {
  return (
    <section className="flex flex-col">
      <section className="flex-grow flex flex-col justify-center my-3">
        <div className="flex flex-row justify-center">
          <h2 className="text-xl font-bold">주 거래계좌를 선택해주세요.</h2>
          <button type="button" className="absolute right-0 mr-3 text-blue-500">
            추가
          </button>
        </div>
      </section>
      <section className="flex-grow-[3] flex items-center my-3">
        <AccountCarousel />
      </section>
      <section className="flex-grow flex items-center">
        <div className="w-full flex flex-row justify-evenly">
          <button type="button" className="bg-gray-500 w-[40%] h-[50px] rounded-[10px] text-white">취소</button>
          <button type="button" className="bg-blue-500 w-[40%] h-[50px] rounded-[10px] text-white">적용</button>
        </div>
      </section>
    </section>
  );
}
