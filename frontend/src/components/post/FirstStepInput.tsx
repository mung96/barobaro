import CategoryTagList from '@/components/post/CategoryTagList';
import Button from '@/components/shared/Button';
import { useState } from 'react';

type FirstStepInputProps = {
  onNext: (firstData: string) => void;
};

function FirstStepInput({ onNext }: FirstStepInputProps) {
  const firstData = 'firstData';
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col">
      <h2> 게시글 등록 첫 스탭</h2>

      <CategoryTagList
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={() => onNext(firstData)} width="100%" height="36px">
        다음 스탭으로 가기
      </Button>
    </div>
  );
}

export default FirstStepInput;
