'use client';

import { useState } from 'react';
import SelectTab from './SelectTab';
import MessageRoomList from './MessageRoomList';

export default function Contents() {
  const [selected, setSelected] = useState<string>('entire');

  const changeSelected = (value: string) => {
    console.log(value);
    setSelected(value);
  };

  return (
    <>
      <SelectTab selectValue={selected} changeSelected={changeSelected} />
      <MessageRoomList selectValue={selected} />
    </>
  );
}
