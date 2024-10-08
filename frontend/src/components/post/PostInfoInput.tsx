import {  useForm } from 'react-hook-form';
import CategoryTagList from '@/components/post/CategoryTagList';
import PostBody from '@/components/post/PostBody';
import PostTitleInput from '@/components/post/PostTitleInput';
import ProductImageList from '@/components/post/ProductImageList';
import Button from '@/components/shared/Button';
import useFileModel from '@/hooks/shared/useFileModel';
import { PostInfo, ProductCategory } from '@/types/domains/product';
import { PostFormFields, StepProps } from '@/hooks/post/usePostFormModel';

type Props = {
  onNext: () => void;
}& StepProps<PostFormFields>;

function PostInfoInput({ onNext,fields,errors }: Props) {
  const { files, changeFile, handleDragEnd, deleteFileByIndex } =
    useFileModel();

  // const { getValues, control, formState: { errors, isValid }} = useForm<PostInfo>({
  //   mode:'onChange'
  // });

  // const { field: title, fieldState: titleState } = useController<PostInfo>({
  //   control,
  //   name: 'title',
  //   defaultValue:'',
  //   rules: {
  //     required: '게시글 제목을 입력해주세요.',
  //     minLength: { value: 2, message: '제목은 2자 이상 입력해주세요' },
  //     maxLength: { value: 20, message: '제목은 20자 이하 입력해주세요' },
  //   },
  // });


  // const { field: images, fieldState: imagesState } = useController<PostInfo>({
  //   control,
  //   name: 'images',
  // });

  // const { field: category, fieldState: categoryState } = useController<PostInfo>({
  //   control,
  //   name: 'category',
  //   defaultValue:'TELESCOPE',
  //   rules: {
  //     required: '카테고리를 선택해주세요',
  //   },
  // });


  // const { field: body, fieldState: bodyState } = useController<PostInfo>({
  //   control,
  //   name: 'body',
  //   defaultValue:'',
  //   rules: {
  //     required: '게시글 내용을 입력해주세요.',
  //     minLength: { value: 1, message: '게시글은 1자 이상 입력해주세요' },
  //     maxLength: { value: 1000, message: '게시글은 1000자 이하 입력해주세요' },
  //   },
  // }); 
 

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
        <Button disabled={false} onClick={onNext} width="100%" height="48px">
          <p className="text-base text-white">다음</p>
        </Button>
      </div>
    </div>
  );
}
export default PostInfoInput;
