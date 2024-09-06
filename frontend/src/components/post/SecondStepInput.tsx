type SecondStepInputProps = {
  firstData: string;
  onNext: (secondData: string) => void;
};

function SecondStepInput({ firstData, onNext }: SecondStepInputProps) {
  console.log(firstData);
  const secondData = 'secondData';
  return (
    <div>
      <h2>게시글 등록 두번째 스탭</h2>
      <button type="button" onClick={() => onNext(secondData)}>
        다음 스탭으로 가기
      </button>
    </div>
  );
}

export default SecondStepInput;
