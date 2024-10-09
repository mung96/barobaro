import ContractCardBox from '@/components/post/ContractCardBox';
import { InputProps } from '@/components/post/ContractInfoInput';
import ContractWidget from '@/components/post/ContractWidget';
import { useProfileObject } from '@/store/useMyProfile';

function OwnerInfoCard() {
  const profile = useProfileObject();
  return (
    <ContractCardBox title="물건 소유자(갑) 상세 정보" step={5}>
      <div className="flex flex-col gap-2">
        <ContractWidget title="성명" value={profile.name} />
        <ContractWidget title="전화번호" value={profile.phoneNumber} />
        <ContractWidget title="이메일" value={profile.email} />
      </div>
    </ContractCardBox>
  );
}

export default OwnerInfoCard;
