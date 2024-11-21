'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {useParams, useRouter, useSearchParams} from "next/navigation";
import {getContractPdf} from "@/apis/contractPdfApi";

const PdfViewer = dynamic(
    () => import('@naverpay/react-pdf').then((mod) => mod.PdfViewer),
    { ssr: false },
);

export default function ContractPaperModal() {
    const [isClient, setIsClient] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const pdfUrl = "https://barobaro.s3.ap-northeast-2.amazonaws.com/contract/res.pdf"
    const {chat_id} = useParams();

    useEffect(() => {
        getContractPdf(Number(chat_id));
    }, [])
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex flex-col h-[45vh] w-full">
            <div className="flex-grow overflow-auto">
                {isClient && (
                    <PdfViewer
                        pdfUrl={pdfUrl}
                    />
                )}
            </div>
        </div>
    );
}
