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

      <p
        className={`text-2xs absolute -bottom-[2px] translate-y-full ${isInvalid ? 'text-red-500' : 'text-green-400'}`}
      >
        {message}
      </p>
    </div>
  );
};

export default NicknameInput;
