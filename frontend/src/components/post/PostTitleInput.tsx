import { Control, useWatch } from 'react-hook-form';
import Input from '@/components/shared/Input';
import { PostInfo } from '@/types/domains/product';

type PostTitleInputProps = {
  control: Control<PostInfo>;
  onChange?: (title: string) => void;
};

const PostTitleInput = ({ control, onChange }: PostTitleInputProps) => {
  const title = useWatch({ control, name: 'title' });
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-xs">제목</h3>
      <Input
        width="100%"
        height="32px"
        placeholder="게시글 제목을 입력해주세요"
        value={title}
        onChange={onChange}
      />
    </div>
  );
};

export default PostTitleInput;
