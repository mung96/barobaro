'use client';

import { MouseEvent } from 'react';

type SelectTabParams = {
  selectValue: string;
  changeSelected: (value: string) => void;
};

export default function SelectTab({ selectValue, changeSelected }: SelectTabParams) {
  // 이벤트 핸들러의 타입을 MouseEvent<HTMLButtonElement>로 수정
  const handleSelect = (e: MouseEvent<HTMLButtonElement>) => {
    // 버튼의 data-value 속성에서 값을 가져옴
    const value = e.currentTarget.getAttribute('data-value');
    if (value) {
      changeSelected(value);
    }
  };

  return (
    <div className="w-full h-[5vh] mt-[7vh] flex">
      <button
        type="button"
        data-value="entire"
        onClick={handleSelect}
        className={`w-[10vh] h-full ${selectValue === 'entire' ? 'bg-gray-300 text-white' : 'bg-gray-400 text-gray-300'} ml-[1vh] text-sm rounded-2xl`}
      >
        전체
      </button>
      <button
        type="button"
        data-value="own"
        onClick={handleSelect}
        className={`w-[10vh] h-full ${selectValue === 'own' ? 'bg-gray-300 text-white' : 'bg-gray-400 text-gray-300'} ml-[1vh] text-sm rounded-2xl`}
      >
        소유
      </button>
      <button
        type="button"
        data-value="lent"
        onClick={handleSelect}
        className={`w-[10vh] h-full ${selectValue === 'lent' ? 'bg-gray-300 text-white' : 'bg-gray-400 text-gray-300'} ml-[1vh] text-sm rounded-2xl`}
      >
        대여
      </button>
    </div>
  );
}
