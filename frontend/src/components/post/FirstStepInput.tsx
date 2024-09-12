import Button from '@/components/shared/Button';

type FirstStepInputProps = {
  onNext: (firstData: string) => void;
};

function FirstStepInput({ onNext }: FirstStepInputProps) {
  const firstData = 'firstData';
  return (
    <div className="flex flex-col">
      <h2> 게시글 등록 첫 스탭</h2>
      <button type="button" onClick={() => onNext(firstData)}>
        다음 스탭으로 가기
      </button>
      <Button
        onClick={() => console.log('버튼클릭')}
        width={'100%'}
        height={'36px'}
      >
        다음 스탭으로 가기
      </Button>
    </div>
  );
}

export default FirstStepInput;
