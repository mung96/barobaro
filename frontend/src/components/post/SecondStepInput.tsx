type SecondStepInputProps = {
  firstData: string;
  onNext: (secondData: string) => void;
  onPrev: () => void;
};

function SecondStepInput({ firstData, onNext, onPrev }: SecondStepInputProps) {
  console.log(firstData);
  const secondData = 'secondData';
  return (
    <div className="flex flex-col">
      <h2>게시글 등록 두번째 스탭</h2>
      <button type="button" onClick={() => onPrev()}>
        이전 스탭으로 가기
      </button>
      <button type="button" onClick={() => onNext(secondData)}>
        다음 스탭으로 가기
      </button>
    </div>
  );
}

export default SecondStepInput;
