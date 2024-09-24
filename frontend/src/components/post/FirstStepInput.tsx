import CategoryTagList from '@/components/post/CategoryTagList';
import ProductImageList from '@/components/post/ProductImageList';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import useFileModel from '@/hooks/shared/useFileModel';

import { useState } from 'react';

type FirstStepInputProps = {
  onNext: (firstData: string) => void;
};

function FirstStepInput({ onNext }: FirstStepInputProps) {
  const firstData = 'firstData';
  const [value, setValue] = useState('');
  const [address, setAddress] = useState('');
  const [ways, setWays] = useState<string[]>([]);
  const { files, changeFile, handleDragEnd } = useFileModel();
  return (
    <div className="flex flex-col gap-4">
      <h2> 게시글 등록 첫 스탭</h2>
      <CategoryTagList
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex flex-col gap-2">
        <ReturnTypeList values={ways} onChange={setWays} />
        {ways.includes('택배') && (
          <Input
            width="100%"
            height="24px"
            placeholder="주소등록"
            value={address}
            onChange={setAddress}
          />
        )}
      </div>

      <ProductImageList
        width={'36px'}
        height={'36px'}
        images={files}
        onChange={changeFile}
        dropEnd={handleDragEnd}
      />
      <Button onClick={() => onNext(firstData)} width="100%" height="36px">
        다음 스탭으로 가기
      </Button>
    </div>
  );
}
export default FirstStepInput;
