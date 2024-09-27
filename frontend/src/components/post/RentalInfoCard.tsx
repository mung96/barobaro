import ContractCardBox from '@/components/post/ContractCardBox';
import React, { useState } from 'react';
import { HiOutlineCurrencyDollar } from 'react-icons/hi2';
import { IoCalendarClearOutline } from 'react-icons/io5';

type Props = {
  title: string;
  name: string | React.ReactNode;
  value: string;
  [key: string]: any;
};

const NameValueWidget = ({ title, name, value, ...rest }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-base">{title}</p>
      <div className="bg-gray-500 py-1 flex w-fit rounded-md">
        <div className="text-sm px-2 min-w-fit py-1">{name}</div>
        <input
          className="text-sm text-center bg-gray-500 outline-none"
          value={value}
          {...rest}
        />
      </div>
    </div>
  );
};

const RentalInfoCard = () => {
  const [productName, setProductName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  return (
    <ContractCardBox title={'물건 소유자 및 대여 정보'} step={1}>
      <div className="flex flex-col gap-2">
        <NameValueWidget
          title="물건 소유자(갑)"
          name="성명"
          value="김소유"
          disabled
        />

        <NameValueWidget
          title="대여 물품"
          name="물품 이름"
          value={productName}
          onChange={setProductName}
          placeholder="물건 이름"
        />
        <NameValueWidget
          title="일련 번호"
          name="일련 번호"
          value={serialNumber}
          onChange={setSerialNumber}
          placeholder="일련 번호 입력"
        />
        <NameValueWidget
          title="대여 기간"
          name={<IoCalendarClearOutline className="text-xl" />}
          value={'2024.09.24-2025.0925'}
          disabled
        />
        <NameValueWidget
          title="대여료"
          name={<HiOutlineCurrencyDollar className="text-xl" />}
          value={'60000원'}
          disabled
        />
      </div>
    </ContractCardBox>
  );
};

export default RentalInfoCard;
