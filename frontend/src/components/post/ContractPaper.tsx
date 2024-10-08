import { useProfileObject } from "@/store/useMyProfile";
import { ContractInfoStep, ContractPreviewStep, PostInfoStep, RentalInfoStep } from "@/types/domains/product";
import { calculateDaysBetween, formatDate } from "@/utils/dayUtil";
import { convertMoneyNumberToKorean } from "@/utils/moneyUtil";

type Props = {
    context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
};
const ContractPaper = ({ context }: Props) => {
    const profile = useProfileObject();
    console.log(profile);
    const totalFee = (context.rentalFee! * (calculateDaysBetween(context.rentalDuration?.from!, context.rentalDuration?.to!)));
    return <article className="w-full flex flex-col gap-6">
        <h3 className="text-xl font-bold text-center">임대계약서</h3>
        <div className='flex flex-col gap-6'>
            <p>{profile.name}(이하 ‘갑’이라 함)과(와) 아무개(이하 ‘을’이라 함)과(와)
                바로바로(이하 ‘병’이라 함)은 다음과 같이 임대계약을 체결한다.</p>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 1조] (계약의 성립)</h4>
                <p>
                    <p>① 본 계약에서 대여 제품, 대여비, 대여 기간이라 함은 {context.productName}({context.serialNumber}), 금 {convertMoneyNumberToKorean(totalFee)} 정 ({totalFee.toLocaleString()})원, {formatDate(context.rentalDuration?.from!) + ' ~ ' + formatDate(context.rentalDuration?.to!)}으로
                        진행한다.</p>
                    <p>②‘갑’은 대여 서비스를 제공하는 선량한 개인으로써 정직하고 책임감 있게 대여 서비스를 제공하여야하며, ‘을’은 대여 서비스를 받는 선량한 개인으로써 대여 제품의 사용 및 책임의 주체가 된다. ‘병’은 대여 서비스만을 중개하는 업체로써, ‘갑’과 ‘을’간의 분쟁 발생 시에 법적 책임을 지지 않는다.</p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 2조] (대여 제품 녹화)</h4>
                <p>
                    택배로 대여 제품을 반납할 경우, ‘을’은 대여 제품의 점검, 포장, 택배 발송 등의 정황을 CCTV 및 영상기기 등을 활용하여 녹화하고 이를 ‘병’에게 제공해야 한다. ‘병’은 해당 영상을 계약이 종료되고 14일까지 보관할 수 있다. 법적 분쟁 발생 시에 ‘병’에게 증거자료를 요청할 수 있고 ‘병’은 영상 편집하지 않고 원본으로 수사기관 및 사법기관에 제출한다.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 3조] (일방적 계약 취소)</h4>
                <p>
                    <p> ①’갑’이 일방적으로 계약을 취소했을 경우에 ’갑’은 ‘을’에게 보상 의무가 있다. 이 때, 대여 기간 시작일을 기준으로 한다.
                        <p>7일 전 취소 시, 보상 의무 없음</p>
                        <p>3일 전 취소 시, 대여금의 50%</p>
                        <p>3일 이후 취소 시, 대여금의 100%</p>
                    </p>
                    <p>  ②‘을’이 일방적으로 계약을 취소했을 경우에 ’을’은 ‘갑’에게 보상 의무가 있다. 이 때, 대여 기간 시작일을 기준으로 한다.
                        <p>7일 전 취소 시, 보상 의무 없음</p>
                        <p>3일 전 취소 시, 대여금의 50%</p>
                        <p>3일 이후 취소 시, 대여금의 100%</p></p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 4조] (대여 제품 수령 후 하자 발견 및 사용 중 갑작스러운 고장)</h4>
                <p>
                    <p>①‘을’은 대여 제품을 수령한 당일에 하자 유무를 확인하여야 하며, 하자 발견 즉시 ‘갑’에게 보고를 하고 협의 하에 조치를 취하도록 한다. 단, 하자가 아님에도 물건을 반송한 경우에는 ‘갑’의 과실이 아닌 ‘을’의 과실이므로 반송 과정 중 발생한 비용(택배비나 퀵비용 등)은 ‘갑’이 지불한다. ‘갑’이 제품 수령일에 ‘을’에게 하자에 대한 보고를 하지 않는다면, 정상 제품을 수령한 것으로판단한다.  </p>
                    <p>②‘을’의 과실이 아닌 상황으로, 갑작스러운 고장으로 인해 사용이 불가능해질 경우 ‘을’은 ‘갑’에게 즉시 해당내용을 알리며 반납조치를 취하고 조기반납으로 인한 일수만큼의 환불을 보장받는다.     </p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 5조] (수리)</h4>
                <p>
                    대여 제품 손상 시, 수리는 {context.repairVendor![0]}에서 처리하도록 하며 ‘갑’과 ‘을’은 대여 제품을 자체적으로 개조하지 않고 수리하지 않는다. 수리가 진행될 경우, ‘갑’은 ‘을’에게 수리센터에서 발급한 수리비 견적서나 영수증을 제출해야 한다. 이는 ‘갑’, ‘을’ 모두 부정행위를 저지르지 않게 하기 위함이다.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 6조] (수리 가능한 수준의 제품 손상 및 부분 분실의 경우)</h4>
                <p>
                    <p> ①‘을’은 대여 제품의 손상 및 부분 분실한 경우, 즉시 ‘갑’에게 보고한다. ②반납 후 대여 제품의 손상 및 부분 분실이 발견되었을 경우, ‘갑’은 ‘을’에게 보고한다.</p>
                    <p>  ③해당 사안의 경우, ‘을’은 영업손실 비용을 ‘갑’에게 지불한다. 영업손실 비용은 수리비용 또는 분실품 구매 비용과 수리 또는 구매 기간 중 대여료를 합한 비용을 뜻한다.</p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 7조] (도난, 분실, 수리불가 수준의 손상의 경우)</h4>
                <p>
                    ‘을’이 대여 제품을 도난, 분실하였거나 수리 불가 수준으로 손상하였을 경우, ‘갑’은 새 제품을 구매하여 대여를 지속하고 ‘을’은 새 제품 구매 비용을 ‘갑’에게 지불한다.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 8조] (무단 연체)</h4>
                <p>
                    <p>①‘을’은 대여 기간 종료 후 {context.overdueCriteria}일 안에 대여 제품을 ‘갑’에게 반환해야 한다. 이를 어길 시에, 대여 기간에 따른 무단 연체료가 발생한다. 무단 연체료는 연체된 날마다 대여 제품 1일 가격의 {context.overdueFee}배로 계산한다. 예를 들어, 1일 가격이 1만 5천원일 때, 1일 연체되었을 경우 4만 5천원의 연체료가 발생한다.</p>
                    <p>②무단 연체료는 정상 반납이 될 때까지 부과되는 요금이지만, ‘을’이 무단 연체를  {context.theftCriteria}일 이상 지속할 경우 도난으로 취급하고 새 제품 구매 비용을 청구한다. 이는 새제품 구매 비용보다 연체료가 크게 나오는 것을 방지하기 위함이다.</p>
                    <p>③‘을’과 연락이 지속되는 경우라도, {context.theftCriteria}일 이상 무단 연체를 지속한다면 해당 사안을 도난으로 취급한다. 이는 ‘을’이 악의적으로 연락만 지속하고 반납을 하지않아 ‘갑’에게 더 큰 영업 손실을 안기는 것을 방지하기 위함이다.</p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 9조] (청구 비용의 지불)</h4>
                <p>
                    ‘을’은 ‘갑’이 청구한 비용을 청구한 시점 기준  {context.refundDeadline}일 내에 지불해야 한다. ‘을’이 이를 어길 시, ‘갑’은 ‘을’을 민형사상 고소 할 수 있으며 법원에 지불하는 인지대, 송달비 등 도 ‘갑’에게 추가로 청구 할 수 있으며 법정이자 또한 추가로 청구 할 수 있다.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 10조] (대여 계약의 종료)</h4>
                <p>
                    대여 제품이 정상 반납된 것을 ‘갑’이 직접 확인하여야, 대여 과정 자체가 완료된 것이다.
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 11조] (거래 기록 및 데이터 보관)</h4>
                <p>
                    <p>①'병'은 ‘갑’과 ‘을’ 간의 거래 내역을 포함한 데이터(거래 일시, 금액, 계약서 사본 등)를 보관하며, 이는 계약 종료 후 1년 동안 저장된다.</p>
                    <p> ②거래 내역은 법적 분쟁 발생 시 증거로 활용될 수 있으며, 당사자가 요청하는 경우 해당 기록을 제공할 수 있다.</p>
                </p>
            </div>
            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 12조] (전자 서명 및 효력)</h4>
                <p>
                    <p> ① 전자 서명 방식
                        본 계약은 ‘갑’, ‘을’, 및 ‘병’의 전자 서명으로 체결된다. 전자 서명은 각 당사자가 본 계약서 상의 내용을 충분히 숙지하고 동의하였음을 증명하는 방법으로, 법적 효력을 갖는다. 전자 서명 방식으로는 공인된 전자 서명 시스템 또는 본 플랫폼에서 제공하는 인증 시스템을 사용한다.</p>
                    <p> ② 서명 절차
                        계약 당사자는 본 계약서의 내용을 확인한 후, 전자 서명을 하기 전에 본인 인증 절차를 거쳐야 한다. 본인 인증은 휴대폰 인증, 이메일 인증, 공인 인증서 또는 기타 신뢰할 수 있는 인증 방법으로 진행된다. 서명은 각 당사자가 계약서 확인 후 전자적으로 서명 버튼을 클릭함으로써 완료된다.</p>
                    <p> ③ 서명 확인 및 보관
                        각 당사자가 전자 서명을 완료한 후, 본 계약서는 자동으로 ‘병’이 운영하는 서버에 저장되며, 서명된 계약서의 원본 사본은 ‘갑’과 ‘을’에게 이메일 또는 기타 디지털 방식으로 제공된다. 전자 서명이 완료된 계약서는 수정할 수 없으며, 법적 분쟁 시 증거 자료로 사용될 수 있다.</p>
                    <p> ④ 전자 서명의 법적 효력
                        본 계약서에 사용된 전자 서명은 전자 문서 및 전자 거래 기본법에 의거하여 법적 효력을 가지며, 본 계약서에 서명한 당사자들은 전자 서명이 본인의 서명임을 인정한다. 전자 서명은 자필 서명과 동일한 법적 효력을 가지며, 계약 당사자들은 이를 법적 분쟁 시 증거로 제출할 수 있다.</p>
                </p>
            </div>

            <div className='flex flex-col gap-2'>
                <h4 className='font-bold text-lg'>[제 13조] (전자 서명 시스템의 안정성)</h4>
                <p>
                    본 계약에 사용되는 전자 서명 시스템은 안정적이고 신뢰할 수 있는 방식으로 운영되며, 서명 절차 중 발생하는 오류나 문제에 대해서는 ‘병’이 그 시스템의 안정성을 보장한다. 전자 서명 중 발생한 기술적 오류가 있을 경우, ‘갑’, ‘을’은 즉시 ‘병’에게 알리고, 문제를 해결한 후 다시 서명 절차를 진행한다.
                </p></div>
        </div >

    </article>
}

export default ContractPaper;