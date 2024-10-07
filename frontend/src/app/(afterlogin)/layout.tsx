import React from 'react';
import NavBar from '@/components/NavBar';



type Props = {
    children: React.ReactNode;  
}

export default function AfterLoginLayout({ children }: Props) {
  
  return (
        <div className="w-full max-w-[500px] mx-auto content-center ">
          {children}
          <NavBar/>
        </div>
  
  );
}