'use client';

import { useContext, useEffect } from 'react';
import { ProcessType } from './ProcessTypes';
import { ProcessContext } from '@/contexts/ChatProcessContext';

type ChatProcessSetterParam = {
  fromChatPageModel: ProcessType;
  fromSocketClientModel?: ProcessType;
};

const ChatProcessSetter = ({ fromChatPageModel, fromSocketClientModel }: ChatProcessSetterParam) => {
  const context = useContext(ProcessContext);
  if (!context) return null;
  const { process, processSetter } = context;

  useEffect(() => {
    console.log(`detected [fromChatPageModal] process change : ${fromChatPageModel} - ChatProcessSetter. line 18`);
    if (fromChatPageModel) processSetter(fromChatPageModel);
  }, [fromChatPageModel]);

  useEffect(() => {
    console.log(
      `detected [fromSocketClientModel] process change : ${fromSocketClientModel} - ChatProcessSetter. line 22`,
    );
    if (fromSocketClientModel) processSetter(fromSocketClientModel);
  }, [fromSocketClientModel]);

  return <div className="invisible">{process}</div>;
};

export default ChatProcessSetter;
