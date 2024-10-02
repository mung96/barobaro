import {
  convertAccountColor,
  convertAccountImage,
} from '@/services/account/accountInfo';
import Image from 'next/image';

type Props = {
  bank: string;
  accountNumber: string;
  main: boolean;
  isSelected: boolean;
};

export default function AccountCard({
  bank,
  accountNumber,
  main,
  isSelected,
}: Props) {
  return (
    <div
      className="w-[300px] h-[200px] mx-auto rounded-[8px] border-4"
      style={{ borderColor: convertAccountColor(bank) }}
    >
      <div className="flex flex-row justify-end items-start h-[80px] m-3">
        {isSelected ? 'Selected!' : null}
        <Image
          src={convertAccountImage(bank)}
          alt={'bank'}
          width={100}
          height={100}
        />
      </div>
      <br />
      <br />
      <div className="mx-4">
        <p>
          {bank} {accountNumber}
        </p>
        {main ? (
          <p className="text-[8px] font-light">
            현재 주계좌로 설정된 계좌입니다.
          </p>
        ) : null}
      </div>
      {/*<p>Main Account: {main ? 'Yes' : 'NO'}</p>*/}
    </div>
  );
}
