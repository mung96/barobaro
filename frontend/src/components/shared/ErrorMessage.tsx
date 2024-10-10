import { ReactNode } from "react";
import { MdError } from "react-icons/md";

type Props = {
  isInvalid: boolean;
  children: ReactNode;
}

const ErrorMessage = ({ isInvalid, children }: Props) => {
  return <p
    className={`text-xs flex gap-1 absolute -bottom-1 translate-y-full ${isInvalid ? 'text-pinkRed' : 'text-green-400'}`}
  >
    {isInvalid && <MdError className="text-pinkRed text-sm" />}
    {children}
  </p>
}

export default ErrorMessage;
