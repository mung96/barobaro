import { useState } from 'react';
import ContractCardBox from '@/components/post/ContractCardBox';
import ContractWidget from '@/components/post/ContractWidget';

function RefundInfoCard() {
  const [value] = useState('0');
  return (
    <ContractCardBox title="청구 비용" step={4}>
      <ContractWidget
        title="청구 비용 지급"
        name="청구한 시점 기준"
        value={value}
        end="일"
      />
    </ContractCardBox>
  );
}

export default RefundInfoCard;
