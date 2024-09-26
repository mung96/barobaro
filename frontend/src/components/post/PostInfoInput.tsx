import CategoryTagList from '@/components/post/CategoryTagList';
import PostBody from '@/components/post/PostBody';
import PostTitleInput from '@/components/post/PostTitleInput';
import ProductImageList from '@/components/post/ProductImageList';

import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import { PostInfo, ProductCategory } from '@/types/domains/product';

import { useState } from 'react';

type Props = {
  onNext: (postData: PostInfo) => void;
};

function PostInfoInput({ onNext }: Props) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProductCategory>('LIGHT_STICK');
  const [body, setBody] = useState('');
  const { files, changeFile, handleDragEnd, deleteFileByIndex } =
    useFileModel();

  return (
    <div className="flex flex-col gap-4">
      <PostTitleInput value={title} onChange={setTitle} />

      <CategoryTagList
        value={category}
        onChange={(e) => setCategory(e.target.value as ProductCategory)}
      />

      <ProductImageList
        width={'56px'}
        height={'56px'}
        images={files}
        addFile={changeFile}
        deleteFile={deleteFileByIndex}
        dropEnd={handleDragEnd}
      />

      <PostBody value={body} onChange={setBody} />
      <Button
        onClick={() =>
          onNext({
            title: title,
            content: body,
            category: category,
            files: files,
          })
        }
        width="100%"
        height="36px"
      >
        다음 스탭으로 가기
      </Button>
    </div>
  );
}
export default PostInfoInput;
