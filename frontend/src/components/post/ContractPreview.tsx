import Button from '@/components/shared/Button';

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
      <div className="flex  gap-6">
        <Button onClick={onPrev} width="100%" height="36px" color="gray">
          <p className="text-xs">이전</p>
        </Button>
        <Button
          onClick={() => console.log(1)}
          width="100%"
          height="36px"
          color="blue"
        >
          <p className="text-xs">다음</p>
        </Button>
      </div>
    </div>
  );
}

export default ContractPreview;
