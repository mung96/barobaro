import TextArea from '@/components/shared/TextArea';

type PostBodyProps = {
  value: string;
  onChange: (value: string) => void;
};

const PostBody = ({ value, onChange }: PostBodyProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">내용</h3>
      <TextArea
        rows={6}
        placeholder="가격을 입력해주세요."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default PostBody;
