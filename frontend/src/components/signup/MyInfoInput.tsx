import Image from 'next/image';
import { useForm } from 'react-hook-form';
import CameraBody from '@/components/(SVG_component)/CameraBody';
import { MyInfo } from '@/types/domains/signup';
import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import NicknameInput from '@/components/signup/NicknameInput';

type Props = {
  onNext: (myInfoData: MyInfo) => void;
};

function MyInfoInput({ onNext }: Props) {
  const { file, changeFile } = useFileModel();
  const { getValues, control, setValue } = useForm<MyInfo>();

  return (
    <div className="flex flex-col gap-2">
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
          <span>과</span>
          <span className="text-blue-100">닉네임</span>
          <span>을 설정해주세요!</span>
        </p>
      </div>
      <section className="w-full justify-center items-center flex flex-col ">
        <label className="bg-gray-500 w-[89px] h-[89px] rounded-full relative">
          {file && (
            <Image
              src={file as string}
              alt="Profile preview"
              fill
              style={{ objectFit: 'cover' }}
              className="border rounded border-gray-500 w-full h-full"
            />
          )}
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
      </section>
      <NicknameInput
        control={control}
        onChange={(value) => setValue('nickname', value)}
      />
      <Button onClick={() => onNext(getValues())} width="100%" height="36px">
        <p className="text-xs">다음</p>
      </Button>
    </div>
  );
}

export default MyInfoInput;
