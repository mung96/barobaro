import { useForm } from 'react-hook-form';
import Button from '@/components/shared/Button';
import { MyTown } from '@/types/domains/signup';
import MyTownSearch from '@/components/signup/MyTownSearch';

// type Props = {};
type Props = {
  onPrev: () => void;
  onNext: (myInfoData: MyTown) => void;
};

function MyTownInfo({ onPrev, onNext }: Props) {
  const { getValues, control, setValue } = useForm<MyTown>();
  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-black-100 text-[15px] font-bold">
          거래를 진행하고 싶은 \r\n 동네를 선택해주세요
        </h2>

        <div>
          <p className="text-base font-semibold">
            <span className="text-blue-100">거래</span>
            <span>를 진행할 동네를 설정해주세요.</span>
          </p>
          <p className="text-base font-semibold">
            <span>최대 </span>
            <span className="text-blue-100">3개</span>
            <span>의 동네에서 거래를 할 수 있어요. </span>
          </p>
        </div>
      </div>
      <MyTownSearch
        control={control}
        onChange={(value) => setValue('town', value)}
      />

      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>

        <Button onClick={() => onNext(getValues())} width="100%" height="36px">
          <p className="text-xs">다음</p>
        </Button>
      </div>
    </div>
  );
}

export default MyTownInfo;
