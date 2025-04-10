import { FC } from 'react';
import Image from 'next/image';
import MessageFormType from './MessageFormType';
import MessageCommonStyles from './MessageStyles';

const UserMessage: FC<MessageFormType> = ({
  body,
  timestamp,
  isMine,
  isImg,
}) => {
  // 이미지, 텍스트 메시지
  return (
    <div
      className={`${MessageCommonStyles.outerDivStyle} ${isMine ? 'justify-end' : 'justify-start'}`}
    >
      {isMine && (
        <div className={`${MessageCommonStyles.timestampStyle} pr-[1vh]`}>
          {timestamp}
        </div>
      )}
      {isImg ? (
        <Image
          src={body}
          alt="userImage"
          width={100}
          height={100}
          className={`w-[30vh] rounded-b-2xl rounded-t${isMine ? 'l' : 'r'}-2xl mb-[2.3vh]`}
        />
      ) : (
        <div
          className={`${MessageCommonStyles.messageStyle} ${
            isMine
              ? ' rounded-tl-2xl text-white bg-blue-100'
              : 'rounded-tr-2xl text-black bg-gray-400'
          }`}
        >
          {body}
        </div>
      )}
      {isMine || (
        <div className={`${MessageCommonStyles.timestampStyle} pl-[1vh]`}>
          {timestamp}
        </div>
      )}
    </div>
  );
};

export default UserMessage;
