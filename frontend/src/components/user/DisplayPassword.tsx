'use client';

import React, {useEffect} from 'react';
import {getPINApi} from "@/apis/passwordApi";

interface DisplayPasswordProps {
  length: number;
  maxLength?: number;
}

// eslint-disable-next-line react/function-component-definition
const DisplayPassword: React.FC<DisplayPasswordProps> = ({
  length,
  maxLength = 6,
}) => {
  const passwordDisplay = () =>
    Array.from({ length: maxLength }, (_, index) =>
      index < length ? (
        <div key={`dot-${index}`} className="w-[22px] h-[15px]">
          <div className="rounded-full bg-gray-300 w-[15px] h-[15px]" />
        </div>
      ) : (
        <div
          key={`line-${index}`}
          className="h-[15px] w-[22px] flex flex-col justify-center items-center"
        >
          <div className="bg-gray-300 h-[1px] w-[22px]" />
        </div>
      ),
    );

  // useEffect(() => {
  //     const getPasswordFunction = async () => {
  //         const res = await getPINApi()
  //         console.log(res)
  //     }
  //     getPasswordFunction()
  // }, [])
  return (
    <section className="flex space-x-2 items-center">
      {passwordDisplay()}
    </section>
  );
};

export default DisplayPassword;
