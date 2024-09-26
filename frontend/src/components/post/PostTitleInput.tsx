import Input from '@/components/shared/Input';

type PostTitleInputProps = {
  value: string;
  onChange: (title: string) => void;
};

const PostTitleInput = ({ value, onChange }: PostTitleInputProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">제목</h3>
      <Input
        width="100%"
        height="32px"
        placeholder="게시글 제목을 입력해주세요"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PostTitleInput;
