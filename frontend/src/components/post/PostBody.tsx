import { Control, useWatch } from 'react-hook-form';
import TextArea from '@/components/shared/TextArea';
import { PostInfo } from '@/types/domains/product';

type PostBodyProps = {
  control: Control<PostInfo>;
  onChange: (value: string) => void;
};

const PostBody = ({ control, onChange }: PostBodyProps) => {
  const body = useWatch({ control, name: 'body' });
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">내용</h3>
      <TextArea
        rows={6}
        placeholder="가격을 입력해주세요."
        value={body}
        onChange={onChange}
      />
    </div>
  );
};

export default PostBody;
