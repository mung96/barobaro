import { UUID } from 'crypto';
import { createContext, ReactNode, useState } from 'react';

interface ChatOpponentUserInfoContextType {
  otherNickname: string;
  otherUuid: UUID | string;
}

const OpponentContext = createContext<ChatOpponentUserInfoContextType | null>(null);

interface ChatOpponentUserInfoContextProps {
  children: ReactNode;
  value: ChatOpponentUserInfoContextType;
}

const OpponentProvider = ({ children, value }: ChatOpponentUserInfoContextProps) => {
  const { otherNickname, otherUuid } = value;

  return <OpponentContext.Provider value={{ otherNickname, otherUuid }}>{children}</OpponentContext.Provider>;
};

export { OpponentProvider, OpponentContext };
