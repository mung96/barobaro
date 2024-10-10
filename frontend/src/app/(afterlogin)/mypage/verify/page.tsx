import Header from "@/components/Header";

export default function VerifyPage() {
    return (
        <div>
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
                            <div className="font-bold text-[8px] text-gray-600 underline">문서 ID 확인 방법</div>
                        </div>
                        {/*TODO: input으로 변경하여 값 삽입*/}
                    </div>
                    <div
                        className="bg-gray-400 rounded-[5px] text-gray-600 text-[10px] w-[300px] h-[35px] flex flex-col justify-center my-3">영문과
                        숫자,
                        -만 입력
                    </div>
                    <div className="mt-3 w-[85%]">
                        <h2 className="text-[12px] font-bold">검증 대상 문서</h2>
                    </div>
                    <div className="bg-gray-400 rounded-[5px] text-gray-600 text-[10px] w-[300px] h-[170px] flex flex-col justify-center items-center my-3">
                        파일 찾기?
                    </div>
                    <button type="button" className="font-bold bg-blue-100 w-[130px] h-[30px] text-white text-xs rounded-[8px]">
                        검증하기
                    </button>
                </section>
            </section>
        </div>
    )
}