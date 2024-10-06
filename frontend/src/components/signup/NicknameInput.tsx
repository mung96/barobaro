import ErrorMessage from '@/components/shared/ErrorMessage';
import Input from '@/components/shared/Input';

type Props = {
  onChange: (title: string) => void;
  value: string;
  isInvalid: boolean;
  message: string;
};

const NicknameInput = ({ value, onChange, isInvalid, message }: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full relative">
      <h3 className="text-xs">닉네임</h3>
      <Input
        width="100%"
        height="32px"
        placeholder="닉네임을 입력해주세요"
        value={value}
        onChange={onChange}
      />

      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
};

export default NicknameInput;
