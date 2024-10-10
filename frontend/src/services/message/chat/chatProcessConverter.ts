import MessageFormType from '@/components/message/chat/MessageFormType';
import { ProcessTypes } from '@/components/message/chat/ProcessTypes';

const chatProcessConverter = (message: MessageFormType, isOwners?: boolean) => {
  if (message.type === 2) {
    switch (message.body) {
      case 'contract':
        return ProcessTypes.REQUESTED;
      case 'signature':
        return ProcessTypes.ACCEPTED_DIRECT;
      case 'finished':
        return ProcessTypes.SIGNED_DIRECT;
      default:
        return undefined;
    }
  } else if (message.type === 3) {
    switch (message.body) {
      case 'accept':
        return ProcessTypes.REQUESTED;
      case 'reject':
        return ProcessTypes.CONTACT;
      case 'finished':
        return ProcessTypes.SIGNED_DIRECT;
      case 'received': {
        if (isOwners) return ProcessTypes.RECEIVED_DIRECT;
        else return ProcessTypes.FINISHED;
      }
      case 'paid':
        return ProcessTypes.PAID_DIRECT;
      default:
        return undefined;
    }
  } else if (message.type === 1) {
    switch (message.body) {
      case 'trigger':
        return ProcessTypes.PAID_DIRECT;
    }
  }

  return undefined;
};

export default chatProcessConverter;

// domain
/*

    -- STATUS MESSAGE (type 2)
        -> 계약 시작
    * contract : 대여자가 계약 요청 폼을 작성함
    * signature : 소유자가 계약 요청에 서명함 
    * finished : 대여자가 서명함
    
    -- SYSTEM MESSAGE (type 3) 
    * accept : 소유자가 계약 요청을 수락함 (*process 변경하지 않음)
    * reject : 소유자가 계약 요청을 거절함
    * finished : 대여자가 서명함
    * received && !isOwners : 대여자가 물품 수령함
    * paid : 대여자가 대금 지불함
    * received && isOwners : 소유자가 물품 수령함 
        -> 계약 종료
*/
