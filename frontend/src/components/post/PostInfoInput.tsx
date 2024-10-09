import CategoryTagList from '@/components/post/CategoryTagList';
import PostBody from '@/components/post/PostBody';
import PostTitleInput from '@/components/post/PostTitleInput';
import ProductImageList from '@/components/post/ProductImageList';
import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import { ProductCategory } from '@/types/domains/product';
import { PostFormFields, StepProps } from '@/hooks/post/usePostFormModel';

type Props = {
  onNext: () => void;
  isValid: boolean;
} & StepProps<PostFormFields>;

function PostInfoInput({ onNext, fields, errors, isValid }: Props) {
  const { files, changeFile, handleDragEnd, deleteFileByIndex } =
    useFileModel();
  return (
    <div className="flex flex-col gap-8">
      <PostTitleInput
        value={fields.title.field.value as string}
        onChange={fields.title.field.onChange}
        isInvalid={fields.title.fieldState.invalid}
        message={errors.title?.message!}
      />

      <CategoryTagList
        value={fields.category.field.value as ProductCategory}
        onChange={fields.category.field.onChange}
        isInvalid={fields.category.fieldState.invalid}
        message={errors.category?.message!}
      />

      <ProductImageList
        width="56px"
        height="56px"
        images={files}
        onChange={fields.images.field.onChange}
        addFile={changeFile}
        deleteFile={deleteFileByIndex}
        dropEnd={handleDragEnd}
      />

      <PostBody
        value={fields.body.field.value as string}
        onChange={fields.body.field.onChange}
        isInvalid={fields.body.fieldState.invalid}
        message={errors.body?.message!}
      />
      <div className="fixed bottom-4 left-0 w-[100vw] px-4">
        <Button disabled={!isValid} onClick={onNext} width="100%" height="48px">
          <p className="text-base text-white">다음</p>
        </Button>
      </div>
    </div>
  );
}
export default PostInfoInput;
