'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import axios from "axios";
import {getContractPdf} from "@/apis/contractPdfApi";
import {useContractUrl} from "@/store/useContractPaperStore";
import {useParams, useRouter} from "next/navigation";
import { useApproveContractUrl } from "@/store/useContractPaperStore";

const PdfViewer = dynamic(
  () => import('@naverpay/react-pdf').then((mod) => mod.PdfViewer),
  { ssr: false }, // This will only import the component on the client side
);

export default function ContractPDFPage() {
    const [isClient, setIsClient] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const pdfUrl = useContractUrl();
    const [contractPdfUrl, setContractPdfUrl] = useState<string>('');
    // TODO : PDF 가져오는 과정 테스트 필요.
    const {chat_id} = useParams();

    useEffect(() => {
        async function getPdfUrl() {
            try {
                const response = await getContractPdf(Number(chat_id));
                console.log('Response of approve', response)
            } catch (err) {
                console.log(err);
            }
        }
    }, [])

    const downloadPdf = async () => {
        setIsDownloading(true);
        try {
            const response = await axios({
                url: pdfUrl,
                method: 'GET',
                responseType: 'blob',
            });
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'contract.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(downloadUrl);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            alert("PDF 다운로드 중 오류가 발생했습니다.");
        } finally {
            setIsDownloading(false);
        }
    }

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col">
            <div className="sticky top-0 z-10 bg-white shadow flex justify-between items-center">
                <Header pageName="계약서" hasPrevBtn hasSearchBtn={false} hasAlertBtn={false}/>
            </div>
            <div className="fixed top-[10px] right-1 z-20">
                <button
                    onClick={downloadPdf}
                    disabled={isDownloading}
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-4 hover:bg-blue-600 transition-colors disabled:bg-gray-400"
                >
                    {isDownloading ? '다운로드 중...' : 'PDF 다운로드'}
                </button>
            </div>
            <div className="flex-grow overflow-auto mt-[80px]">
                {isClient && (
                    <PdfViewer
                        pdfUrl={pdfUrl}
                    />
                )}
            </div>
        </div>
    );
}
