// type LentInfo = {
//   title: string;
//   period: string;
// };

import React from 'react';

// type UserInfo = {
//   // 유저 정보
// };

// type Message = {
//   type: number;
//   user: UserInfo;
//   body?: string;
//   info?: LentInfo;
//   timestamp: string;
// };

const go: React.CSSProperties = {
  maxWidth: '70vw',
};
export default function Message() {
  // 메시지 타입에 따라 처리 분리
  return (
    <div className="flex justify-end pr-[2vh] pl-[2vh]">
      <div
        className="flex whitespace-normal p-[2.3vh] text-xs overflow-hidden rounded-tl-2xl rounded-b-2xl text-white bg-blue-100 mb-[2vh]"
        style={go}
      >
        왜안가는데왜안가는데왜안가는데왜안가는데왜안가는데왜안가는데왜안가는데
        ㅋㅋㅋㅋㅋㅋㅋ ㅋㅋ
      </div>
    </div>
  );
}
