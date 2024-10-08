import { ContractInfo, PostInfo, RentalInfo, ContractInfoStep, ContractPreviewStep, PostInfoStep,RentalInfoStep } from "@/types/domains/product";
import {  FieldErrors, useController,  UseControllerReturn,  useForm } from "react-hook-form";

import { } from '@/types/domains/product';


export type StepProps<T> = {
    fields: T;
  errors: FieldErrors<PostFunnelStep>;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
 
};
type PostFunnelStep = PostInfo&RentalInfo&ContractInfo;
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
const usePostFormModel = ()=>{
  const { getValues, control, formState: { errors, isValid },handleSubmit} = useForm<PostFunnelStep>({
    mode:'onChange'
  });
  const title = useController<PostFunnelStep>({
    control,
    name: 'title',
    defaultValue:'',
    rules: {
      required: '게시글 제목을 입력해주세요.',
      minLength: { value: 2, message: '제목은 2자 이상 입력해주세요' },
      maxLength: { value: 20, message: '제목은 20자 이하 입력해주세요' },
    },
  });

  const images= useController<PostFunnelStep>({
    control,
    name: 'images',
  });

  const  category = useController<PostFunnelStep>({
    control,
    name: 'category',
    defaultValue:'TELESCOPE',
    rules: {
      required: '카테고리를 선택해주세요',
    },
  });


  const  body= useController<PostFunnelStep>({
    control,
    name: 'body',
    defaultValue:'',
    rules: {
      required: '게시글 내용을 입력해주세요.',
      minLength: { value: 1, message: '게시글은 1자 이상 입력해주세요' },
      maxLength: { value: 1000, message: '게시글은 1000자 이하 입력해주세요' },
    },
  }); 
 
  const rentalDuration = useController<PostFunnelStep>({
    control,
    name: 'rentalDuration',
    defaultValue:'',
    rules: {
      required: '대여 날짜를 골라주세요.',
    },
  });
  const rentalFee = useController<PostFunnelStep>({
    control,
    name: 'rentalFee',
    defaultValue:'',
    rules: {
      required: '대여 금액을 입력해주세요.',
    },
  });
  const  rentalAddress = useController<PostFunnelStep>({
    control,
    name: 'rentalAddress',
    defaultValue:'',
    rules: {
      required: '대여 장소를 입력해주세요.',
    },
  });
  const returnTypeList= useController<PostFunnelStep>({
    control,
    name: 'returnTypeList',
    defaultValue:'',
    rules: {
      required: '반납 방법을 정해주세요.',
    },
  });
  const returnAddress = useController<PostFunnelStep>({
    control,
    name: 'returnAddress',
    defaultValue:'',
    rules: {
      required: '반납 장소를 입력해주세요.',
    },
  });
  
   
const postFieldList:PostFormFields = {
    title: title,
    body: body,
    category: category,
    images: images,
};
  

  const rentalFieldList:RentalFormFields ={
    rentalDuration: rentalDuration,
    rentalFee:rentalFee,
    returnTypeList: returnTypeList,
    returnAddress: returnAddress,
    rentalAddress: rentalAddress
  }

  const contractFieldList={

  }

  return {postFieldList,rentalFieldList,getValues,errors,isValid,handleSubmit}

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

}

export default usePostFormModel;