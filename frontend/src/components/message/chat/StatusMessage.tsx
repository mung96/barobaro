import MessageFormType from './MessageFormType';
import MessageCommonStyles from './MessageStyles';

const StatusMessage: React.FC<MessageFormType> = ({
  body,
  user,
  timestamp,
  isMine,
  type,
}) => {
  return (
    <div
      className={`${MessageCommonStyles.outerDivStyle} ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {isMine && (
        <div
          className={`${MessageCommonStyles.timestampStyle} p${isMine ? 'r' : 'l'}-[1vh]`}
        >
          {timestamp}
        </div>
      )}
      <div className="w-[60vw]">
        <>
          <div
            className={`${MessageCommonStyles.messageStyle.substring(0, 55)} pl-[2.3vh] pt-[1.5vh] pb-[1.5vh] ${isMine ? 'rounded-tl-2xl' : 'rounded-tr-2xl'} bg-gray-500`}
          >
            <div className="font-bold">
              {body === 'contract' ? '계약을' : '전자계약서 서명을'}
            </div>
            <div className="font-bold">
              {body === 'finished' ? '완료하였습니다.' : '요청하였습니다.'}
            </div>
          </div>

          <div
            className={`${MessageCommonStyles.messageStyle} rounded-b-2xl bg-gray-400`}
          >
            <div>닉네임2님,</div>
            {body === 'contract' ? (
              <div>
                닉네임1님께서 <b>고양이 쓰다듬고 가세요</b>에 대하여 계약을
                요청하셨습니다.
              </div>
            ) : body === 'signature' ? (
              <div>
                "닉네임1_닉네임2_응원봉_대여계약서_20240923"에 서명해 주세요.
              </div>
            ) : body === 'finished' ? (
              <div>
                "닉네임1_닉네임2_응원봉_대여계약서_20240923"에 모든 서명이
                완료되었습니다. 문서 내용을 확인해 보세요.
              </div>
            ) : (
              <></>
            )}

            {body === 'finished' && (
              <>
                <div>
                  "닉네임1_닉네임2_응원봉_대여계약서_20240923"에 모든 서명이
                  완료되었습니다. 문서 내용을 확인해 보세요.
                </div>
                <div className="mt-[2vh]"> 문서이름:</div>
                <div>닉네임1_닉네임2_응원봉_대여계약서_20240923</div>
              </>
            )}

            {(body === 'signature' || body === 'finished') && (
              <>
                <div className="mt-[2vh]">서명 요청자:</div>
                <div>닉네임1(010-1234-****)</div>

                <div className="mt-[2vh]">서명자:</div>
                <div>닉네임1(010-1234-****)</div>
                <div>닉네임2(010-5678-****)</div>
              </>
            )}

            {isMine === false &&
              (body === 'signature' || body === 'contract') && (
                <button
                  type="button"
                  className="bg-blue-100 text-white text-center rounded-md pt-[1vh] pb-[1vh] mt-[1vh] active:bg-blue-500"
                >
                  {body === 'signature'
                    ? '서명하기'
                    : body === 'contract'
                      ? '상세보기'
                      : ''}
                </button>
              )}
          </div>
        </>
      </div>
      {isMine || (
        <div className={`${MessageCommonStyles.timestampStyle} pl-[1vh]`}>
          {timestamp}
        </div>
      )}
    </div>
  );
};

export default StatusMessage;
