import React, { useState } from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { IoCalendarClearOutline } from 'react-icons/io5';
import ContractWidget from '@/components/post/ContractWidget';
import ContractCardBox from '@/components/post/ContractCardBox';

function RentalInfoCard() {
  const [productName, setProductName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  return (
    <ContractCardBox title="물건 소유자 및 대여 정보" step={1}>
      <div className="flex flex-col gap-2">
        <ContractWidget
          title="물건 소유자(갑)"
          name="성명"
          value="김소유"
          disabled
        />

        <ContractWidget
          title="대여 물품"
          name="물품 이름"
          value={productName}
          onChange={setProductName}
          placeholder="물건 이름"
        />
        <ContractWidget
          title="일련 번호"
          name="일련 번호"
          value={serialNumber}
          onChange={setSerialNumber}
          placeholder="일련 번호 입력"
        />
        <ContractWidget
          title="대여 기간"
          name={<IoCalendarClearOutline className="text-xl" />}
          value="2024.09.24-2025.0925"
          disabled
        />
        <ContractWidget
          title="대여료"
          name={<HiOutlineCurrencyDollar className="text-xl" />}
          value="60000원"
          disabled
        />
      </div>
    </ContractCardBox>
  );
}

export default RentalInfoCard;
