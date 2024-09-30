type ProcessButtonParam = {
  hasContract: boolean; // 계약서가 있는 거래인가
  process: number;
  isOwner: boolean; // 소유자: true, 대여자: false
};

import Clipboard from '@/components/(SVG_component)/(message)/Clipboard';
import AddMessage from '@/components/(SVG_component)/(message)/AddMessage';
import Checked from '@/components/(SVG_component)/(message)/(chat)/Checked';
import OpenedBox from '@/components/(SVG_component)/(message)/(chat)/OpenedBox';
import UploadVideo from '@/components/(SVG_component)/(message)/(chat)/UploadVideo';

import PROCESSTYPES from './ProcessTypes';
import Money from '@/components/(SVG_component)/(message)/(chat)/Money';
import useProcessButtonEventModal from '@/hooks/message/chat/useProcessButtonEventModal';

const buttonStyle: string =
  'bg-gray-400 pl-[2vh] pr-[2vh] pt-[0.4vh] pb-[0.4vh] rounded-lg flex items-center active:bg-gray-500 disabled:bg-gray-500';

const ProcessButton: React.FC<ProcessButtonParam> = ({
  process,
  isOwner,
  hasContract,
}) => {
  const { requestEvent, receivedEvent, paidEvent } =
    useProcessButtonEventModal();

  return (
    <>
      {/* 계약 프로세스와 사용자 역할(파라메터 값)에 따라 노출되는 버튼 결정 */}

      <button type="button" className={buttonStyle}>
        <Clipboard />
        <span>&nbsp;{hasContract ? '계약조건' : '반납방법'}</span>
      </button>

      {!isOwner &&
        process >= PROCESSTYPES.CONTACT &&
        process <= PROCESSTYPES.ACCEPTED_PACK && (
          <button
            type="button"
            className={buttonStyle}
            disabled={process >= PROCESSTYPES.REQUESTED}
            onClick={requestEvent}
          >
            <AddMessage />
            <span>
              &nbsp;
              {process === PROCESSTYPES.CONTACT ? '계약요청' : '요청완료'}
            </span>
          </button>
        )}
      {((!isOwner && process === PROCESSTYPES.PAID_PACK) ||
        (isOwner && process === PROCESSTYPES.SIGNED_PACK)) && (
        <button type="button" className={buttonStyle}>
          <UploadVideo />
          <span>&nbsp;영상제출</span>
        </button>
      )}

      {((!isOwner && process >= PROCESSTYPES.SIGNED_DIRECT) ||
        (isOwner && process >= PROCESSTYPES.PAID_DIRECT)) && (
        <>
          <button
            type="button"
            className={buttonStyle}
            disabled={
              (!isOwner && process > PROCESSTYPES.SIGNED_PACK) ||
              (isOwner && process > PROCESSTYPES.PAID_PACK)
            }
            onClick={receivedEvent}
          >
            <Checked />
            <span>
              &nbsp;수령
              {(!isOwner && process <= PROCESSTYPES.SIGNED_PACK) ||
              (isOwner && process <= PROCESSTYPES.PAID_PACK)
                ? '확인'
                : '완료'}
            </span>
          </button>
          {((!isOwner && process === PROCESSTYPES.SIGNED_PACK) ||
            (isOwner && process === PROCESSTYPES.PAID_PACK)) && (
            <button type="button" className={buttonStyle}>
              <OpenedBox />
              <span>&nbsp;택배조회</span>
            </button>
          )}
        </>
      )}

      {!isOwner && process >= PROCESSTYPES.RECEIVED_DIRECT && (
        <button
          type="button"
          className={buttonStyle}
          disabled={process >= PROCESSTYPES.PAID_DIRECT}
          onClick={paidEvent}
        >
          <Money />
          <span>&nbsp;송금{process >= PROCESSTYPES.PAID_DIRECT && '완료'}</span>
        </button>
      )}
    </>
  );
};

export default ProcessButton;
