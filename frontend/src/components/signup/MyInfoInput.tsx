import { useController, useForm } from 'react-hook-form';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import { MyInfo } from '@/types/domains/signup';
import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import NicknameInput from '@/components/signup/NicknameInput';
import { SocialMember } from '@/types/domains/member';

type Props = {
  onNext: (myInfoData: MyInfo) => void;
  member: SocialMember;
};

function MyInfoInput({ onNext, member }: Props) {
  const { file, changeFile } = useFileModel();
  const {
    getValues,
    control,
    formState: { errors, isValid },
  } = useForm<MyInfo>({ mode: 'onChange' });

  const { field: nickname, fieldState: nicknameState } = useController<MyInfo>({
    control,
    name: 'nickname',
    defaultValue: member?.nickName,
    rules: {
      required: '닉네임을 입력해주세요',
      minLength: { value: 2, message: '닉네임은 2자 이상 입력해주세요' },
      maxLength: { value: 10, message: '닉네임은 10자 이하 입력해주세요' },
    },
  });

  return (
    <div className="flex flex-col gap-16 w-full">
      <div className="flex flex-col gap-2 w-full">
        <h2 className="text-black-100 text-[15px] font-bold">
          프로필을 설정해주세요.
        </h2>
        <div>
          <p className="text-base font-semibold">
            <span className="text-blue-100">본인</span>
            <span>을 잘 나타낼 수 있는</span>
          </p>
          <p className="text-base font-semibold">
            <span className="text-blue-100">프로필 사진</span>
            <span>과&nbsp; </span>
            <span className="text-blue-100">닉네임</span>
            <span>을 설정해주세요!</span>
          </p>
        </div>
      </div>
      <section className="w-full justify-center items-center flex flex-col gap-7">
        <label className="bg-gray-500 w-[89px] h-[89px] rounded-full relative">
          <img
            src={file ? (file as string) : member?.profileImage}
            alt="Profile preview"
            style={{ objectFit: 'cover' }}
            className="border rounded-full border-gray-500 w-full h-full"
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => changeFile(Array.from(event.target.files!))}
          />
          <div className="bg-gray-400 w-[25px] h-[25px] rounded-full absolute bottom-0 right-0 flex items-center justify-center">
            <CameraBody fill="#747483" width="15.2" height="12.67" />
          </div>
        </label>
        <NicknameInput
          value={nickname.value}
          onChange={nickname.onChange}
          isInvalid={nicknameState.invalid}
          message={errors.nickname?.message!}
        />
      </section>
      <Button
        disabled={!isValid}
        onClick={() => onNext(getValues())}
        width="100%"
        height="36px"
      >
        <p className="text-xs">다음</p>
      </Button>
    </div>
  );
}

export default MyInfoInput;
