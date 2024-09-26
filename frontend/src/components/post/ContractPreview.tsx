type Props = {
  onPrev: () => void;
};

function ContractPreview({ onPrev }: Props) {
  return (
    <div className="flex flex-col">
      <h2>게시글 등록 마지막</h2>
      <button type="button" onClick={onPrev}>
        이전 스탭으로 돌아가기
      </button>
      <button type="button">등록이 완료됐어요.</button>
    </div>
  );
}

export default ContractPreview;
