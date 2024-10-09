import { ReactNode, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import DropDownAnimation from '@/components/shared/DropDownAnimation';
import ErrorMessage from '@/components/shared/ErrorMessage';

type Props = {
  title: string;
  step: number;
  children: ReactNode;
};

function ContractCardBox({ title, step, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-gray-400 py-5 px-4 w-full rounded-xl flex flex-col gap-3 relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between"
      >
        <p className="text-lg font-semibold">{title}</p>
        <div className="flex items-center justify-center">
          <p>
            <span className="text-base font-bold">{step}</span>
            <span className="text-base text-gray-300"> / 5</span>
          </p>
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
      </button>
      <div className='absolute top-12 w-full'>
        {!isOpen && <ErrorMessage isInvalid={true}>입력해야하는 정보가 남아있어요</ErrorMessage>}
      </div>
      <DropDownAnimation isOpen={isOpen}>{children}</DropDownAnimation>
    </div>
  );
}

export default ContractCardBox;
