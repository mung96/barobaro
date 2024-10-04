import { MyTown } from '@/types/domains/signup';

// type Props = {};
type Props = {
  onPrev: () => void;
  onNext: (myInfoData: MyTown) => void;
};

function MyTownInfo({ onPrev, onNext }: Props) {
  const valid = true;

  console.log(onPrev, onNext);
  return (
    <>
      <h2 className="text-black-100 text-[15px] font-bold">
        거래를 진행하고 싶은
      </h2>
      <h2 className="text-black-100 text-[15px] font-bold">
        동네를 선택해주세요
      </h2>
      <div className="text-[11px] font-medium">
        <div className="flex">
          <p className="text-blue-100">거래</p>
          <p>를 진행할 동네를 설정해주세요.</p>
        </div>
        <div className="flex">
          <p className="me-1">최대 </p>
          <p className="text-blue-100">3개</p>
          <p>의 동네에서 거래를 할 수 있어요.</p>
        </div>
      </div>
      <div>동네 설정</div>
      <div>동네 검색</div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white">
        <div className="flex max-w-[450px] justify-center items-center">
          <button
            type="button"
            className={`${
              valid ? 'bg-blue-100' : 'bg-gray-400'
            } w-[40%] h-[36px] rounded-[5px] mx-auto`}
          >
            <p
              className={`font-bold text-[14px] ${
                valid ? 'text-white' : 'text-gray-200'
              }`}
            >
              이전
            </p>
          </button>
          <button
            type="button"
            className={`${
              valid ? 'bg-blue-100' : 'bg-gray-400'
            } w-[40%] max-w-[450px] h-[36px] rounded-[5px] mx-auto`}
          >
            <p
              className={`font-bold text-[14px] ${
                valid ? 'text-white' : 'text-gray-200'
              }`}
            >
              설정 완료
            </p>
          </button>
        </div>
      </div>
    </>
  );
}

export default MyTownInfo;
