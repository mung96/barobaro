import { UUID } from 'crypto';
import { createContext, ReactNode, useState } from 'react';

interface ChatOpponentUserInfoContextType {
  otherNickname: string;
  otherUuid: UUID | string;
  ownerUuid: UUID | string;
}

const OpponentContext = createContext<ChatOpponentUserInfoContextType | null>(null);

interface ChatOpponentUserInfoContextProps {
  children: ReactNode;
  value: ChatOpponentUserInfoContextType;
}

const OpponentProvider = ({ children, value }: ChatOpponentUserInfoContextProps) => {
  const { otherNickname, otherUuid, ownerUuid } = value;

  return (
    <OpponentContext.Provider value={{ otherNickname, otherUuid, ownerUuid }}>{children}</OpponentContext.Provider>
  );
};

export { OpponentProvider, OpponentContext };
