'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import ItemList from '@/components/ItemList';

type Props = {
  children : React.ReactNode
};

export default function MypageLayout({ children }:Props) {
  const segment = useSelectedLayoutSegment();
  return (
    <>
      {children}
      {segment !== null ? <ItemList data={segment} /> : null}
    </>
  );
}
