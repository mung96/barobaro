import Input from '@/components/shared/Input';

type Props = {
  onChange: (title: string) => void;
};

const NicknameInput = ({ value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">닉네임</h3>
      <Input
        width="100%"
        height="32px"
        placeholder="닉네임을 입력해주세요"
        value={value}
        onChange={onChange}
      />

      <div className="mb-4 text-[13px]">닉네임</div>
      <div className="w-full h-[32px] rounded-[7px] flex flex-col justify-center items-center border-gray-500 border-[1px]">
        <input
          className="w-full max-w-[450px]"
          onChange={(e) => handleNicknameChange(e.target.value)}
          value={inputNickname}
        />
      </div>
      {!valid && inputNickname !== '' && (
        <div className="flex flex-col items-end w-full max-w-[500px]">
          <p className="text-[10px]" style={{ color: '#F7385A' }}>
            영어, 숫자, 한글만 사용하여 10자 이내의 닉네임을 입력해주세요.
          </p>
        </div>
      )}
    </div>
  );
};

export default NicknameInput;
