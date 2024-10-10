import React, { useCallback, useRef, useState } from 'react';
import useFileModel from '@/hooks/shared/useFileModel';

export default function usePdfFileModel() {
    const { file, changeFile } = useFileModel();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handlePdfFile = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) {
                if (selectedFile.type === 'application/pdf') {
                    await changeFile([selectedFile]);
                    setFileName(selectedFile.name);
                    setErrorMessage(null);
                } else {
                    setErrorMessage('PDF 파일만 선택해주세요.');
                    setFileName(null);
                }
            }
        },
        [changeFile],
    );

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const clearFile = () => {
        changeFile([]);
        setFileName(null);
        setErrorMessage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return {
        file,
        fileName,
        fileInputRef,
        handlePdfFile,
        handleButtonClick,
        errorMessage,
        clearFile,
    };
}