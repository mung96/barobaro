// type LentInfo = {
//   title: string;
//   period: string;
// };

import React from 'react';

type MessageForm = {
  type: number;
  user: string;
  body?: string;
  //  info?: LentInfo;
  timestamp: string;
};

const me: string = '김말이'; // 임의 지정한 유저 닉네임

// 공통 적용되는 classNames (내가 보낸 것인지 / 상대가 보낸 것인지에 따라 다름)
const outerDivStyle: string = 'flex pr-[2vh] pl-[2vh]'; // justify-content 미포함
const timestampStyle: string =
  'flex items-end pb-[2.3vh] text-xs text-gray-600'; // 좌 / 우 여백 미포함
const messageStyle: string =
  'flex whitespace-normal p-[2.3vh] text-xs overflow-hidden rounded-b-2xl mb-[2vh] max-w-[70vw]'; // 위쪽 둥근 테두리 / 글자색 / 배경색 미포함

export default function Message({ type, user, body, timestamp }: MessageForm) {
  // 메시지 타입에 따라 처리 분리
  const isMine: boolean = me === user; // 내가 보낸 메시지인지 (일반 메시지 타입은 1)
  const isStatus: boolean = type === 2; // 거래 프로세스와 관련된 메시지인지
  const isSys: boolean = type === 3; // 시스템 메시지인지(말풍선으로 표시되지 않는 메시지)
  const isImg: boolean = type === 4; // 이미지 메시지인지

  // 메시지 타입 평가 순서는
  // 시스템 메시지인지 -> 내가 보낸 메시지인지 -> 상태 메시지인지 -> 이미지인지 -> 전부 아니면 남이 보낸 일반 메시지

  return (
    <>
      {
        // 시스템 메시지인 경우
        isSys ? (
          <div className={`${outerDivStyle} justify-center pb-[2vh]`}>
            <div className="text-xs">
              {body === 'datealert' ? ( // 날짜 변경 표시
                <div>{timestamp}</div>
              ) : body === 'modified' ? ( // 계약조건 수정 안내 메시지
                <div className="flex flex-col justify-center">
                  <div className="flex">
                    <b>{user}</b>님이 계약조건을&nbsp;
                    <b className="text-blue-100">수정</b>
                    하였습니다.
                  </div>
                  <div className="flex justify-center">
                    계약조건을 다시 한 번 확인해주세요!
                  </div>
                </div>
              ) : body === 'finished' ? ( // 계약 완료 안내 메시지
                <div className="flex flex-col justify-center">
                  <div className="flex justify-center">
                    계약이&nbsp;
                    <b className="text-blue-100">완료</b>
                    되었습니다.
                  </div>
                  <div className="flex justify-center">
                    계약서가&nbsp;<b>이메일</b>로 발송되었습니다.
                  </div>
                  <div className="flex justify-center">
                    <b>이메일</b>을&nbsp;<b>확인</b>해 주세요!
                  </div>
                </div>
              ) : body === 'accept' || body === 'reject' ? ( // 거래 요청 수락 / 거절 메시지
                <div>
                  <b>{user}</b>님이 계약을
                  <b> {body === 'accept' ? '수락' : '거절'}</b>
                  했습니다.
                </div>
              ) : (
                // 뭣도 아니면
                <div>메시지 변환 중 오류가 발생하였습니다.</div>
              )}
            </div>
          </div>
        ) : isMine ? (
          isStatus ? ( // 내가 보낸 상태 메시지
            <div className={`${outerDivStyle} justify-end`}>
              <div className={`${timestampStyle} pr-[1vh]`}>{timestamp}</div>
              <div
                className={`${messageStyle} rounded-tl-2xl text-white bg-blue-100`}
              >
                {body === 'contract' ? (
                  <div>계약을 요청했습니다.</div>
                ) : body === 'signature' ? (
                  <div className="w-[40vw]">
                    <div className="bg-gray-500 text-black">
                      <div>전자계약서 서명을</div>
                      <div>요청하였습니다. 여기부터 작업</div>
                    </div>
                  </div>
                ) : body === 'finished' ? (
                  <div>전자계약서 서명을 완료하였습니다.</div>
                ) : (
                  <div>메시지 변환 중 오류가 발생하였습니다.</div>
                )}
              </div>
            </div>
          ) : isImg ? ( // 내가 보낸 이미지
            <div className={`${outerDivStyle} justify-end`}>
              <div className={`${timestampStyle} pr-[1vh]`}>{timestamp}</div>
              <img
                src={body}
                className="w-[30vh] rounded-b-2xl rounded-tl-2xl mb-[2.3vh]"
              />
            </div>
          ) : (
            // 내가 보낸 메시지
            <div className={`${outerDivStyle} justify-end`}>
              <div className={`${timestampStyle} pr-[1vh]`}>{timestamp}</div>
              <div
                className={`${messageStyle} rounded-tl-2xl text-white bg-blue-100`}
              >
                {body}
              </div>
            </div>
          )
        ) : isStatus ? ( // 상대가 보낸 상태 메시지
          <div className={`${outerDivStyle} justify-start`}>
            <div
              className={`${messageStyle} rounded-tr-2xl text-black bg-gray-400`}
            >
              {body}
            </div>
            <div className={`${timestampStyle} pl-[1vh]`}>{timestamp}</div>
          </div>
        ) : isImg ? ( // 상대가 보낸 이미지
          <div className={`${outerDivStyle} justify-start`}>
            <img
              src={body}
              className="w-[30vh] rounded-b-2xl rounded-tr-2xl mb-[2.3vh]"
            />
            <div className={`${timestampStyle} pl-[1vh]`}>{timestamp}</div>
          </div>
        ) : (
          // 상대가 보낸 메시지
          <div className={`${outerDivStyle} justify-start`}>
            <div
              className={`${messageStyle} rounded-tr-2xl text-black bg-gray-400`}
            >
              {body}
            </div>
            <div className={`${timestampStyle} pl-[1vh]`}>{timestamp}</div>
          </div>
        )
      }
    </>
  );
}
