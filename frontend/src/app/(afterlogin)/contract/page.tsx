'use client';

import {useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";

// Dynamic import of PdfViewer
const PdfViewer = dynamic(
    () => import('@naverpay/react-pdf').then((mod) => mod.PdfViewer),
    { ssr: false } // This will only import the component on the client side
);
// 'https://financial.pstatic.net/static/terms-policy/npay-usage/230906.pdf'
export default function ContractPDFPage() {
    const [isClient, setIsClient] = useState(false);
    // TODO : 추후 pdf파일을 받아오는 로직을 구현해야 한다.
    const pdfUrl = "https://barobaro.s3.ap-northeast-2.amazonaws.com/contract/res.pdf"
    // const handleRenderPDFError = useCallback(
    //     (e) => {
    //         // 브라우저에서 기본으로 제공하는 pdf viewer를 새창으로 띄우도록 처리
    //         window.open(pdfUrl, '_blank')
    //         // error logging
    //     },
    //     [pdfUrl],
    // )
    useEffect(() => {
        setIsClient(true);
    }, []);
    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="sticky top-0 z-10 bg-white shadow">
                <Header pageName="계약서" hasPrevBtn hasSearchBtn={false} hasAlertBtn/>
            </div>
            <div className="flex-grow overflow-auto">
                {isClient && (
                    <PdfViewer
                        pdfUrl={pdfUrl}
                        style={{height: '100%', width: '100%'}}
                    />
                )}
            </div>
        </div>
    );
}