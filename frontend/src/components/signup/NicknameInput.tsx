import { Control, useWatch } from 'react-hook-form';
import Input from '@/components/shared/Input';
import { MyInfo } from '@/types/domains/signup';

type Props = {
  control: Control<MyInfo>;
  onChange: (title: string) => void;
  defaultValue: string;
};

const NicknameInput = ({ control, onChange, defaultValue }: Props) => {
  const nickname = useWatch({
    control,
    name: 'nickname',
    defaultValue,
  });
  return (
    <div className="flex flex-col gap-1 w-full">
      <h3 className="text-xs">닉네임</h3>
      <Input
        width="100%"
        height="32px"
        placeholder="닉네임을 입력해주세요"
        value={nickname}
        onChange={onChange}
      />

      {/* {!valid && inputNickname !== '' && (
        <div className="flex flex-col items-end w-full max-w-[500px]">
          <p className="text-[10px]" style={{ color: '#F7385A' }}>
            영어, 숫자, 한글만 사용하여 10자 이내의 닉네임을 입력해주세요.
          </p>
        </div>
      )} */}
    </div>
  );
};

export default NicknameInput;
