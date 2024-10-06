import { ReactNode } from "react";

type Props={
    isInvalid:boolean;
    children:ReactNode;
}

const ErrorMessage = ({isInvalid,children}:Props ) =>{
    return   <p
    className={`text-xs absolute -bottom-1 translate-y-full ${isInvalid ? 'text-red-500' : 'text-green-400'}`}
  >
    {children}
  </p>
}

export default ErrorMessage;