import Header from "@/components/Header";

export default function VerifyPage() {
    return (
        <div>
            <Header pageName="마이페이지" hasPrevBtn hasSearchBtn={false} hasAlertBtn />
            <h1 className="font-bold text-[15px]">문서 검증 센터</h1>
            <div className="text-[10px]">
                <p>문서가 원본인지 걱정하셨나요?</p>
                <p>원본 검증키 대조로 문서의 위·변조 여부를 누구나 쉽게 확인할 수 있습니다.</p>
            </div>
            <div>
                <div>
                <div className="text-[12px] font-bold">문서 ID</div>
                    <div>문서 ID 확인 방법</div>
                </div>
                {/*TODO : 색상 칠하고, REGexp*/}
                <div>영문과 숫자, -만 입력</div>
            </div>
            <div>
                <h2 className="text-[12px] font-bold">검증 대상 문서</h2>
                <div>
                    문서 검색 및 찾기
                </div>
            </div>
            <div>
                검증하기
            </div>
        </div>
    )
}