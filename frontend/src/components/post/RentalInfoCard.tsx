import React, { useState } from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { IoCalendarClearOutline } from 'react-icons/io5';
import ContractWidget from '@/components/post/ContractWidget';
import ContractCardBox from '@/components/post/ContractCardBox';
import { ContractFormFields } from '@/hooks/post/usePostFormModel';
import { useProfileObject } from '@/store/useMyProfile';
import { ContractInfoStep, ContractPreviewStep, PostInfoStep, RentalInfoStep } from '@/types/domains/product';
import { calculateDaysBetween, formatDate } from '@/utils/dayUtil';

type Props = {
  fields: ContractFormFields;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;

}

function RentalInfoCard({ fields, context }: Props) {
  const profile = useProfileObject();

  return (
    <ContractCardBox title="물건 소유자 및 대여 정보" step={1}>
      <div className="flex flex-col gap-2">
        <ContractWidget
          title="물건 소유자(갑)"
          name="성명"
          value={profile.name}
          disabled
        />

        <ContractWidget
          title="대여 물품"
          name="물품 이름"
          value={fields.productName.field.value as string}
          onChange={fields.productName.field.onChange}
          placeholder="물건 이름"
        />

        <ContractWidget
          title="일련 번호"
          name="일련 번호"
          value={fields.serialNumber.field.value as string}
          onChange={fields.serialNumber.field.onChange}
          placeholder="일련 번호 입력"
        />
        <ContractWidget
          title="대여 기간"
          name={<IoCalendarClearOutline className="text-xl" />}
          value={formatDate(context.rentalDuration?.from!) + ' ~ ' + formatDate(context.rentalDuration?.to!)}
          disabled
        />
        <ContractWidget
          title="총 대여료(원)"
          name={<HiOutlineCurrencyDollar className="text-xl" />}
          value={context.rentalFee! * (calculateDaysBetween(context.rentalDuration?.from!, context.rentalDuration?.to!))}
          disabled
        />
      </div>
    </ContractCardBox>
  );
}

export default RentalInfoCard;
