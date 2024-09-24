export default function ContractCondition() {
  const data = {
    contract: true,
    method: ['직거래', '택배'],
    condition: {
      damaged: {
        place: '제조사 또는 공식 수입사의 AS 센터',
        charge: '청구 시점 기준 5일 이내 지급',
      },
      delayed: {
        criteria: '대여 기간 종료 후 4일',
        price: '대여 제품 1일 가격의 3배',
      },
    },
  };
  return (
    <section className="w-[85%] my-[12px] text-black-100">
      <h1 className="font-bold text-[12px]">계약조건</h1>
      <section className="bg-gray-400 rounded-[5px] h-[210px] flex flex-col justify-center">
        <div className="flex flex-col m-3">
          <div>
            <h2 className="text-[11px]">전자계약서 작성 여부</h2>
            <p className="text-[10px] text-gray-300 ms-2 my-1">
              전자계약서 작성 {data.contract ? 'O' : 'X'}
            </p>
          </div>
          <div>
            <h2 className="text-[11px]">반납 희망 방법</h2>
            <p className="text-[10px] text-gray-300 ms-2 my-1">{data.method}</p>
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
                  <p className="text-[8px]">{data.condition.damaged.place}</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">청구 비용</h3>
                  <p className="text-[8px]">{data.condition.damaged.charge}</p>
                </div>
              </div>
              <h2 className="text-gray-300 text-[10px] bg-gray-500 rounded-[30px] w-[50px] h-[16px] flex justify-center items-center ms-2 my-1">
                무단연체
              </h2>
              <div className="flex mx-5">
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">기준</h3>
                  <p className="text-[8px]">
                    {data.condition.delayed.criteria}
                  </p>
                </div>
                <div className="flex-1">
                  <h3 className="text-gray-300 text-[10px]">청구 비용</h3>
                  <p className="text-[8px]">{data.condition.delayed.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
