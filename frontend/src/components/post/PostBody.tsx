import TextArea from '@/components/shared/TextArea';
import ErrorMessage from '@/components/shared/ErrorMessage';

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
        rows={6}
        placeholder="게시글 내용을 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <ErrorMessage isInvalid={isInvalid}>{message}</ErrorMessage>
    </div>
  );
};

export default PostBody;
