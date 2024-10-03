import { useForm } from 'react-hook-form';
import CategoryTagList from '@/components/post/CategoryTagList';
import PostBody from '@/components/post/PostBody';
import PostTitleInput from '@/components/post/PostTitleInput';
import ProductImageList from '@/components/post/ProductImageList';
import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import { PostInfo, ProductCategory } from '@/types/domains/product';

type Props = {
  onNext: (postData: PostInfo) => void;
};

function PostInfoInput({ onNext }: Props) {
  const { files, changeFile, handleDragEnd, deleteFileByIndex } =
    useFileModel();

  const { getValues, control, setValue } = useForm<PostInfo>({
    defaultValues: { title: '', body: '', category: 'LIGHT_STICK' },
  });
  return (
    <div className="flex flex-col gap-4">
      <PostTitleInput
        control={control}
        onChange={(value) => setValue('title', value)}
      />

      <CategoryTagList
        control={control}
        onChange={(e) =>
          setValue('category', e.target.value as ProductCategory)
        }
      />

      <ProductImageList
        width="56px"
        height="56px"
        images={files}
        addFile={changeFile}
        deleteFile={deleteFileByIndex}
        dropEnd={handleDragEnd}
      />

      <PostBody
        control={control}
        onChange={(value) => setValue('body', value)}
      />
      <Button onClick={() => onNext(getValues())} width="100%" height="36px">
        <p className="text-xs text-white">다음</p>
      </Button>
    </div>
  );
}
export default PostInfoInput;
