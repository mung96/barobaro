'use client';

import dynamic from 'next/dynamic';



const PortOneComponent = dynamic(() => import('@/components/user/PortOneComponent'), {
    ssr: false,
});


export default function PortonePage() {

    return (<PortOneComponent />
    );
}
