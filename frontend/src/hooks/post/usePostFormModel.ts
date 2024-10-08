import {
  ContractInfo,
  PostInfo,
  RentalInfo,
  ContractInfoStep,
  ContractPreviewStep,
  PostInfoStep,
  RentalInfoStep,
} from '@/types/domains/product';
import { FieldErrors, useController, UseControllerReturn, useForm } from 'react-hook-form';

import { POST_FIELD_CONFIG } from '@/constants/post';

export type StepProps<T> = {
  fields: T;
  errors: FieldErrors<PostFunnelStep>;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
};
type PostFunnelStep = PostInfo & RentalInfo & ContractInfo;
export type PostFormFields = {
  title: UseControllerReturn<PostFunnelStep>;
  body: UseControllerReturn<PostFunnelStep>;
  category: UseControllerReturn<PostFunnelStep>;
  images: UseControllerReturn<PostFunnelStep>;
};
export type RentalFormFields = {
  rentalDuration: UseControllerReturn<PostFunnelStep>;
  rentalFee: UseControllerReturn<PostFunnelStep>;
  rentalAddress: UseControllerReturn<PostFunnelStep>;
  returnTypeList: UseControllerReturn<PostFunnelStep>;
  returnAddress: UseControllerReturn<PostFunnelStep>;
};
const usePostFormModel = () => {
  const {
    getValues,
    control,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<PostFunnelStep>({
    mode: 'onChange',
  });
  const title = useController<PostFunnelStep>({
    control,
    name: 'title',
    ...POST_FIELD_CONFIG.TITLE,
  });
  const images = useController<PostFunnelStep>({
    control,
    name: 'images',
  });

  const category = useController<PostFunnelStep>({
    control,
    name: 'category',
    ...POST_FIELD_CONFIG.CATEGORY,
  });
  const body = useController<PostFunnelStep>({
    control,
    name: 'body',
    ...POST_FIELD_CONFIG.BODY,
  });

  const rentalDuration = useController<PostFunnelStep>({
    control,
    name: 'rentalDuration',
    ...POST_FIELD_CONFIG.RENTAL_DURATION,
  });
  const rentalFee = useController<PostFunnelStep>({
    control,
    name: 'rentalFee',
    ...POST_FIELD_CONFIG.RENTAL_FEE,
  });
  const rentalAddress = useController<PostFunnelStep>({
    control,
    name: 'rentalAddress',
    ...POST_FIELD_CONFIG.RENTAL_ADDRESS,
  });
  const returnTypeList = useController<PostFunnelStep>({
    control,
    name: 'returnTypeList',
    ...POST_FIELD_CONFIG.RETURN_TYPE_LIST,
  });
  const returnAddress = useController<PostFunnelStep>({
    control,
    name: 'returnAddress',
    ...POST_FIELD_CONFIG.RETURN_ADDRESS,
  });
  const postFieldList: PostFormFields = {
    title: title,
    body: body,
    category: category,
    images: images,
  };

  const rentalFieldList: RentalFormFields = {
    rentalDuration: rentalDuration,
    rentalFee: rentalFee,
    returnTypeList: returnTypeList,
    returnAddress: returnAddress,
    rentalAddress: rentalAddress,
  };

  const contractFieldList = {};
  //   const convertProductDataToRequest = ()=>{
  //     //undefined type가드를 활용해야하는데 시간이없네
  //     return {
  //     title: context.title!,
  //     startDate: formatDate(getValues().rentalDuration?.from!),
  //     endDate: formatDate(getValues().rentalDuration?.to!),
  //     rentalFee: getValues().rentalFee!,
  //     place: getValues().rentalAddress?.addressName!,
  //     latitude: Number(getValues().rentalAddress?.latitude!),
  //     longitude: Number(getValues().rentalAddress?.longitude!),
  //     returnTypeList: getValues().returnTypeList!,
  //     returnAddress: getValues().returnAddress?.addressName!,
  //     content: context.body!,
  //     category: context.category!}
  //   }
  //   const postProduct =   handleSubmit(()=>postProduct(convertProductDataToRequest(),context.images! as File[]))

  return {
    postFieldList,
    rentalFieldList,
    getValues,
    errors,
    isValid,
    handleSubmit,
  };
};

export default usePostFormModel;
