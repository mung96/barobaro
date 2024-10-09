import TextArea from '@/components/shared/TextArea';
import ErrorMessage from '@/components/shared/ErrorMessage';
import { BODY_MAX_LENGTH } from '@/constants/post';

type Props = {
  value: string;
  onChange: (value: string) => void;
  isInvalid: boolean;
  message: string;
};

const PostBody = ({ value, onChange, isInvalid, message }: Props) => {
  return (
    <div className="flex flex-col gap-1 relative">
      <h3 className="text-base">내용</h3>
      <TextArea
        rows={7}
        maxLength={BODY_MAX_LENGTH}
        placeholder="게시글 내용을 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <div className='flex flex-row-reverse'>
        <div className='absolute w-full'>
          <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
        </div>
        <p className='text-gray-300 text-xs'>{value.length}/{BODY_MAX_LENGTH}</p>
      </div>
    </div>
  );
};

export default PostBody;
