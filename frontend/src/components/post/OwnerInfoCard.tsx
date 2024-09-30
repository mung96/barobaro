import ContractCardBox from '@/components/post/ContractCardBox';
import { ContractWidget } from '@/components/post/ContractWidget';

function OwnerInfoCard() {
  return (
    <ContractCardBox title="물건 소유자(갑) 상세 정보" step={5}>
      <div className="flex flex-col gap-2">
        <ContractWidget title="성명" value="" />
        <ContractWidget title="전화번호" value="" />
        <ContractWidget title="이메일" value="" />
      </div>
    </ContractCardBox>
  );
}

export default OwnerInfoCard;
