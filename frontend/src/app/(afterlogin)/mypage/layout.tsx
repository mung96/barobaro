import React from 'react';

type Props = {
  children: React.ReactNode;
};

export default function MypageLayout({ children }: Props) {
  return <main>{children}</main>;
}
