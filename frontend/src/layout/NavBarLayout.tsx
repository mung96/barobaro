import NavBar from '@/components/NavBar';
import React from 'react';

type Props = {
  children: React.ReactNode;
  current: string;
};

export default function NavBarLayout({ children, current }: Props) {
  return (
    <>
      {children}
      <NavBar/>
    </>
  );
}
