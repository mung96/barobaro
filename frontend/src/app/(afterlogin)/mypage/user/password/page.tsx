'use client';

import { useState } from 'react';

export default function PasswordChange() {
  const [inputPassword, setInputPassword] = useState('');
  const passwordHandler = (press: string) => {
    setInputPassword((prev) => prev + press);
    console.log(inputPassword);
  };
  const deleteHandler = () => {
    setInputPassword((prev) => prev.slice(0, -1));
    console.log(inputPassword);
  };

  return (
    <>
      <header className="flex flex-col text-center">비밀번호 변경</header>
      <section>
        비밀번호 입력 창
      </section>
      <section>
        <div>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('1')}>1</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('2')}>2</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('3')}>3</button>
        </div>
        <div>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('4')}>4</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('5')}>5</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('6')}>6</button>
        </div>
        <div>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('7')}>7</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('8')}>8</button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50" onClick={() => passwordHandler('9')}>9</button>
        </div>
        <div className="flex flex-row">
          <div className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50"></div>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50"
                  onClick={() => passwordHandler('0')}>0
          </button>
          <button className="w-[30px] h-[30px] w-1/3 text-[25px] h-[12.5dvh] bg-red-50"
                  onClick={() => deleteHandler()}>del
          </button>
        </div>
      </section>
    </>
  );
}
