import NavBar from '@/components/NavBar';
import React from 'react';

type Props = {
  children: React.ReactNode;
  current: string;
};

export default function NavBarLayout({ children }: Props) {
  return (
    <>
      {children}
      <NavBar/>
    </>
  );
}
