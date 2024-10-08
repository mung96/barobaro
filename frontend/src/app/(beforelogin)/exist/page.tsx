'use client';

import dynamic from 'next/dynamic';

const RedirectComponent = dynamic(() => import('@/components/signup/RedirectComponent'), {
  ssr: false,
});


 function RedirectPage() {


  return (
   <RedirectComponent/>
  );
}

export default RedirectPage;
