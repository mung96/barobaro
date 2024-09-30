import { ReactNode, useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import DropDownAnimation from '@/components/shared/DropDownAnimation';

type Props = {
  title: string;
  step: number;
  children: ReactNode;
};

const ContractCardBox = ({ title, step, children }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-gray-400 py-5 px-4 w-full rounded-xl flex flex-col gap-3">
      <div
        role="none"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between"
      >
        <p className="text-base font-semibold">{title}</p>
        <div className="flex items-center justify-center">
          <p>
            <span className="text-base font-bold">{step}</span>
            <span className="text-base text-gray-300"> / 5</span>
          </p>
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </div>
      </div>
      <DropDownAnimation isOpen={isOpen}>{children}</DropDownAnimation>
    </div>
  );
};

export default ContractCardBox;
