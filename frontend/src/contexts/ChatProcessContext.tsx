import { ProcessType } from '@/components/message/chat/ProcessTypes';
import { createContext, ReactNode, useState } from 'react';

interface ProcessContextType {
  process: ProcessType;
  processSetter: (step: ProcessType) => void;
}

const ProcessContext = createContext<ProcessContextType | null>(null);

// ProcessProviderProps 인터페이스 정의
interface ProcessProviderProps {
  children: ReactNode;
  value: ProcessContextType;
}

const ProcessProvider = ({ children, value }: ProcessProviderProps) => {
  const [process, setProcess] = useState<ProcessType>(value.process);

  const processSetter = (step: ProcessType) => {
    setProcess(step);
  };

  return (
    <ProcessContext.Provider value={{ process, processSetter }}>
      {children}
    </ProcessContext.Provider>
  );
};

export { ProcessProvider, ProcessContext };
