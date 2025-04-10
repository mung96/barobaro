import ErrorMessage from '@/components/shared/ErrorMessage';
import Input from '@/components/shared/Input';
import { POST_TITLE_MAX_LENGTH } from '@/constants/post';

type Props = {
  onChange?: (title: string) => void;
  value: string;
  isInvalid: boolean;
  message: string;
};

const PostTitleInput = ({ value, onChange, isInvalid, message }: Props) => {
  return (
    <div className="flex flex-col gap-2 relative">
      <h3 className="text-base">제목</h3>
      <Input
        width="100%"
        height="40px"
        placeholder="게시글 제목을 입력해주세요"
        value={value}
        onChange={onChange}
        maxLength={POST_TITLE_MAX_LENGTH}
      />
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
};

export default PostTitleInput;
