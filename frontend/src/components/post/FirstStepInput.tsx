import CategoryTagList from '@/components/post/CategoryTagList';
import PostTitleInput from '@/components/post/PostTitleInput';
import ProductImageList from '@/components/post/ProductImageList';

import RentalDurationInput from '@/components/post/RentalDurationInput';
import RentalFeeInput from '@/components/post/RentalFeeInput';
import ReturnPlaceInput from '@/components/post/ReturnPlaceInput';
import ReturnTypeList from '@/components/post/ReturnTypeList';
import Button from '@/components/shared/Button';
import Input from '@/components/shared/Input';
import useFileModel from '@/hooks/shared/useFileModel';

import { useState } from 'react';

import { DateRange } from 'react-day-picker';

type FirstStepInputProps = {
  onNext: (firstData: string) => void;
};

function FirstStepInput({ onNext }: FirstStepInputProps) {
  const firstData = 'firstData';
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [fee, setFee] = useState('');
  const [address, setAddress] = useState('');
  const [ways, setWays] = useState<string[]>([]);
  const { files, changeFile, handleDragEnd, deleteFileByIndex } =
    useFileModel();
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  return (
    <div className="flex flex-col gap-4">
      <PostTitleInput value={title} onChange={setTitle} />
      <RentalDurationInput selected={range} onSelect={setRange} />
      <RentalFeeInput value={fee} onChange={setFee} />
      <CategoryTagList
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div className="flex flex-col gap-2">
        <ReturnTypeList values={ways} onChange={setWays} />
        {ways.includes('택배') && (
          <Input
            width="100%"
            height="32px"
            placeholder="주소등록"
            value={address}
            onChange={setAddress}
          />
        )}
      </div>
      <ReturnPlaceInput />

      <ProductImageList
        width={'72px'}
        height={'72px'}
        images={files}
        addFile={changeFile}
        deleteFile={deleteFileByIndex}
        dropEnd={handleDragEnd}
      />

      <Button onClick={() => onNext(firstData)} width="100%" height="36px">
        다음 스탭으로 가기
      </Button>
    </div>
  );
}
export default FirstStepInput;
