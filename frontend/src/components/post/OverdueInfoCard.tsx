import ContractCardBox from '@/components/post/ContractCardBox';
import ContractWidget from '@/components/post/ContractWidget';
import { InputProps } from '@/components/post/ContractInfoInput';

function OverdueInfoCard({ fields, context, errors, isValid }: InputProps) {
  return (
    <ContractCardBox title="무단 연체" step={3} hasInput={true} isCardValid={!fields.overdueFee.fieldState.invalid && !fields.overdueCriteria.fieldState.invalid && !fields.theftCriteria.fieldState.invalid}>
      <div className="flex flex-col gap-2">
        <ContractWidget
          title="무단 연체 기준"
          name="대여 기간 종료 후"
          value={fields.overdueCriteria.field.value as number}
          onChange={fields.overdueCriteria.field.onChange}
          isInvalid={fields.overdueCriteria.fieldState.invalid}
          message={errors.overdueCriteria?.message}
          type="number"
          end="일"
          hasInput={true}
        />
        <ContractWidget
          title="무단 연체 가격"
          name="대여 제품 1일 가격의"
          value={fields.overdueFee.field.value as number}
          onChange={fields.overdueFee.field.onChange}
          isInvalid={fields.overdueFee.fieldState.invalid}
          message={errors.overdueFee?.message}
          type="number"
          end="배"
          hasInput={true}
        />
        <ContractWidget
          title="도난 취급 기준"
          name="무단 연체"
          value={fields.theftCriteria.field.value as number}
          onChange={fields.theftCriteria.field.onChange}
          isInvalid={fields.theftCriteria.fieldState.invalid}
          message={errors.theftCriteria?.message}
          type="number"
          end="일 후"
          hasInput={true}
        />
      </div>
    </ContractCardBox>
  );
}

export default OverdueInfoCard;
