type ProcessButtonPraram = {
  process: number;
  role: boolean; // string? boolean? number?
};

import Clipboard from '@/components/(SVG_component)/(message)/Clipboard';
import AddMessage from '@/components/(SVG_component)/(message)/AddMessage';
import Checked from '@/components/(SVG_component)/(message)/(chat)/Checked';
import OpenedBox from '@/components/(SVG_component)/(message)/(chat)/OpenedBox';
import UploadVideo from '@/components/(SVG_component)/(message)/(chat)/UploadVideo';

const buttonStyle: string =
  'bg-gray-400 pl-[2vh] pr-[2vh] pt-[0.4vh] pb-[0.4vh] rounded-lg flex items-center active:bg-gray-500';

const ProcessButton: React.FC<ProcessButtonPraram> = ({ process, role }) => {
  return (
    <>
      {/* 계약 프로세스와 사용자 역할(파라메터 값)에 따라 노출되는 버튼 다르게 수정 예정 */}

      <button type="button" className={buttonStyle}>
        <Clipboard />
        <span>&nbsp;계약조건</span>
      </button>

      <button type="button" className={buttonStyle}>
        <AddMessage />
        <span>&nbsp;계약요청</span>
      </button>

      <button type="button" className={buttonStyle}>
        <AddMessage />
        <span>&nbsp;송금</span>
      </button>

      <button type="button" className={buttonStyle}>
        <Checked />
        <span>&nbsp;수령확인</span>
      </button>

      <button type="button" className={buttonStyle}>
        <OpenedBox />
        <span>&nbsp;택배조회</span>
      </button>

      <button type="button" className={buttonStyle}>
        <UploadVideo />
        <span>&nbsp;영상제출</span>
      </button>
    </>
  );
};

export default ProcessButton;
