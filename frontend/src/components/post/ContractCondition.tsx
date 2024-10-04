import { ContractContent } from '@/types/apis/productResponse';

export default function ContractCondition({ data }: { data: ContractContent }) {
  return (
    <section className="w-[85%] my-[12px] text-black-100">
      <h1 className="font-bold text-[12px]">계약조건</h1>
      <section className="bg-gray-400 rounded-[5px] h-[210px] flex flex-col justify-center">
        <div className="flex flex-col m-3">
          <div>
            <h2 className="text-[11px]">전자계약서 작성 여부</h2>
            <p className="text-[10px] text-gray-300 ms-2 my-1">
              전자계약서 작성 {data.isWriteContract ? 'O' : 'X'}
            </p>
          </div>
          <div>
            <h2 className="text-[11px]">반납 희망 방법</h2>
            <p className="text-[10px] text-gray-300 ms-2 my-1">직거래, 택배</p>
          </div>
          <div>
            <h2 className="text-[11px]">계약 조건</h2>
            <div>
              <h2 className="text-gray-300 text-[10px] bg-gray-500 rounded-[30px] w-[50px] h-[16px] flex justify-center items-center ms-2 my-1">
                물품손상
              </h2>
              <div className="flex mx-5">
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">수리업체</h3>
                  <p className="text-[8px]">
                    {data.contractCondition.repairVendor}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">청구 비용</h3>
                  <p className="text-[8px]">
                    청구 시점 기준 {data.contractCondition.overdueCriteria}일
                    이내 지급
                  </p>
                </div>
              </div>
              <h2 className="text-gray-300 text-[10px] bg-gray-500 rounded-[30px] w-[50px] h-[16px] flex justify-center items-center ms-2 my-1">
                무단연체
              </h2>
              <div className="flex mx-5">
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">기준</h3>
                  <p className="text-[8px]">
                    대여 기간 종료 후 {data.contractCondition.theftCriteria}일
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">청구 비용</h3>
                  <p className="text-[8px]">
                    1일 이용 가격의 {data.contractCondition.overdueFee}배
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
