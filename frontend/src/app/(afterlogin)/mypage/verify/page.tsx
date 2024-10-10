'use client';

import Header from "@/components/Header";
import { useState } from 'react';
import usePdfFileModel from '@/hooks/shared/usePdfUploadModel';

export default function VerifyPage() {
    const [paperId, setPaperId] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isInputError, setIsInputError] = useState<boolean>(false);
    const { file, fileName, fileInputRef, handlePdfFile, handleButtonClick, errorMessage, clearFile } = usePdfFileModel();

    // Id값으로 입력되어야 하는 값이 정해져있음.
    const isValidPaperId = (inputString: string) => {
        const regex = /^[a-zA-Z0-9\-]+$/;
        return regex.test(inputString);
    }

    // 유효한 값이 input되어야만 paperId를 저장한다.
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (isValidPaperId(newValue)|| newValue === '') {
            setPaperId(newValue)
            setIsInputError(false);
        } else {
            setIsInputError(true);
        }
        console.log(paperId)
    };

    const handleVerify = () => {
        if (!file) {
            alert('PDF 파일을 먼저 업로드해주세요.');
            return;
        }
        if (!paperId) {
            alert('문서 ID를 입력해주세요.');
            return;
        }
        console.log('Verifying document:', { paperId, fileName, file });
        // 여기에 실제 검증 로직을 추가하세요
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="relative">
            <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
            <section className="mt-[80px] flex flex-col items-center">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-[15px]">문서 검증 센터</h1>
                    <div className="text-[10px] m-5 items-center flex-col flex">
                        <p>문서가 원본인지 걱정하셨나요?</p>
                        <p>원본 검증키 대조로 문서의 위·변조 여부를 누구나 쉽게 확인할 수 있습니다.</p>
                    </div>
                </div>
                <section className="w-[90%] flex flex-col items-center">
                    <div className="w-[85%]">
                        <div className="flex justify-between">
                            <div className="text-[12px] font-bold">문서 ID</div>
                            <div className="font-bold text-[8px] text-gray-600 underline cursor-pointer" onClick={openModal}>문서 ID 확인 방법</div>
                        </div>
                    </div>
                    <div className="bg-gray-400 rounded-[5px] text-gray-600 text-[10px] w-[300px] h-[35px] flex flex-col justify-center mt-3">
                        <input
                            name="search_paper"
                            type="search"
                            id="search_input"
                            placeholder="영문과 숫자, -만 입력"
                            className="w-full outline-none [&::-webkit-search-cancel-button]:appearance-none bg-transparent"
                            onChange={changeHandler}
                            pattern="^[a-zA-Z0-9\-가-힣]+$"
                            value={paperId}
                            required
                        />
                    </div>
                    <div className="text-red-500 text-[8px] h-[30px] items-start w-[90%]">{isInputError ? '영문과 숫자, -만 입력 가능합니다.' : ''}</div>
                    <div className="mt-3 w-[85%]">
                        <h2 className="text-[12px] font-bold">검증 대상 문서</h2>
                    </div>
                    <div
                        className="bg-gray-400 rounded-[5px] text-gray-600 text-[10px] w-[300px] min-h-[170px] flex flex-col justify-center items-center my-3 cursor-pointer"
                        onClick={handleButtonClick}
                    >
                        {fileName ? (
                            <div className="flex flex-col items-center">
                                <p className="break-all">{fileName}</p>
                                <button onClick={(e) => { e.stopPropagation(); clearFile(); }} className="mt-2 text-red-500">
                                    파일 제거
                                </button>
                            </div>
                        ) : (
                            "PDF 파일 찾기"
                        )}
                    </div>
                    {errorMessage && <p className="text-red-500 text-xs mt-1">{errorMessage}</p>}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handlePdfFile}
                        className="hidden"
                        accept=".pdf"
                    />
                    <button
                        type="button"
                        className="font-bold bg-blue-500 w-[130px] h-[30px] text-white text-xs rounded-[8px]"
                        onClick={handleVerify}
                    >
                        검증하기
                    </button>
                </section>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-[8px] p-5 w-[320px] h-[260px] flex flex-col">
                        <h2 className="text-[15px] font-bold mb-4 text-center">문서 ID 확인 방법</h2>
                        <div className="text-[10px] text-gray-600 mb-4">
                            <p>PDF 파일의 왼쪽 아래에서 문자 ID를 확인할 수 있습니다.</p>
                            <p>숫자+영문 조합의 ID를 드래그 후 복사해보세요.</p>
                        </div>
                        <div className="bg-gray-300 w-full h-[100px] mb-4 flex items-center justify-center">
                            이미지 예시
                        </div>
                        <button
                            className="mt-auto bg-blue-500 text-white w-[126px] h-[30px] rounded-[8px] self-center"
                            onClick={closeModal}
                        >
                            확인
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}