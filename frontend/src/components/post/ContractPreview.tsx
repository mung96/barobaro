import ContractPaper from '@/components/post/ContractPaper';
import Button from '@/components/shared/Button';
import { ContractInfoStep, ContractPreviewStep, PostInfoStep, RentalInfoStep } from '@/types/domains/product';
import { useEffect, useRef, useState } from 'react';

type Props = {
  onPrev: () => void;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
  isFormValid: boolean;
  isSubmitting: boolean;
  onSubmit: () => void;
};

function ContractPreview({ onPrev, context, onSubmit, isFormValid, isSubmitting }: Props) {
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  return <form className="flex flex-col gap-4" onSubmit={onSubmit}>
    <h3 className='text-lg'>전자계약서 미리보기</h3>
    <section className='border-[1px] border-gray-500 rounded-xl py-6 ' >

      <ContractPaper onScrollToBottom={setIsScrolledToBottom} height='496px' context={context} />

    </section>
    <div className="flex  gap-6">
      <div className="fixed left-0 w-[100vw] bottom-0 px-4 py-3 flex gap-6 border-t-[1px] bg-white z-50">
        <Button onClick={onPrev} width="30%" height="48px" color="gray">
          <p className="text-base">뒤로</p>
        </Button>

        <Button type='submit' disabled={isSubmitting || !isScrolledToBottom} width="100%" height="48px">
          <p className="text-base">작성 완료하기</p>
        </Button>
      </div>
    </div>
  </form>
}
export default ContractPreview;
