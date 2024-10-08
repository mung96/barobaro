type MessageFormType = {
  type: number;
  user: string;
  body: string;
  timestamp: string;

  isMine?: boolean; // 하위 메시지 컴포넌트에서만 사용함
  isImg?: boolean; // UserMessage 컴포넌트에만 사용함
};

export default MessageFormType;
