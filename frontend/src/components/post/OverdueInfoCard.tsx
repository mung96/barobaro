import { useState } from 'react';
import ContractCardBox from '@/components/post/ContractCardBox';
import ContractWidget from '@/components/post/ContractWidget';

function OverdueInfoCard() {
  const [values, setValue] = useState('0');
  return (
    <ContractCardBox title="무단 연체" step={3}>
      <ContractWidget
        title="무단 연체 기준"
        name="대여 기간 종료 후"
        value={values}
        onChange={setValue}
        type="number"
        end="일"
      />
      <ContractWidget
        title="무단 연체 가격"
        name="대여 제품 1일 가격의"
        value={values}
        onChange={setValue}
        type="number"
        end="배"
      />
      <ContractWidget
        title="도난 취급 기준"
        name="무단 연체"
        value={values}
        onChange={setValue}
        type="number"
        end="일 후"
      />
    </ContractCardBox>
  );
}

export default OverdueInfoCard;
