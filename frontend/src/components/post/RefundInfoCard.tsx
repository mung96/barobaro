import ContractCardBox from '@/components/post/ContractCardBox';
import ContractWidget from '@/components/post/ContractWidget';
import { InputProps } from '@/components/post/ContractInfoInput';

function RefundInfoCard({ fields, context, errors, isValid }: InputProps) {
  return (
    <ContractCardBox title="청구 비용" step={4} hasInput={true} isCardValid={!fields.refundDeadline.fieldState.invalid}>
      <ContractWidget
        title="청구 비용 지급"
        name="청구한 시점 기준"
        value={fields.refundDeadline.field.value as number}
        onChange={fields.refundDeadline.field.onChange}
        isInvalid={fields.refundDeadline.fieldState.invalid}
        message={errors.refundDeadline?.message}
        end="일"
        hasInput={true}
      />
    </ContractCardBox>
  );
}

export default RefundInfoCard;
