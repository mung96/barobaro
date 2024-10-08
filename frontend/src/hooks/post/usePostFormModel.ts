import { Location } from "@/types/domains/location";
import { ContractInfo, PostInfo, ProductCategory, RentalInfo } from "@/types/domains/product";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useController, useForm } from "react-hook-form";

type PostFunnelStep = PostInfo&RentalInfo&ContractInfo;
const usePostFormModel = ()=>{
  const { getValues, control, formState: { errors, isValid },handleSubmit} = useForm<PostFunnelStep>({
    mode:'onChange'
  });

  
  const { field: title, fieldState: titleState } = useController<PostFunnelStep>({
    control,
    name: 'title',
    defaultValue:'',
    rules: {
      required: '게시글 제목을 입력해주세요.',
      minLength: { value: 2, message: '제목은 2자 이상 입력해주세요' },
      maxLength: { value: 20, message: '제목은 20자 이하 입력해주세요' },
    },
  });

  const { field: images, fieldState: imagesState } = useController<PostFunnelStep>({
    control,
    name: 'images',
  });

  const { field: category, fieldState: categoryState } = useController<PostFunnelStep>({
    control,
    name: 'category',
    defaultValue:'TELESCOPE',
    rules: {
      required: '카테고리를 선택해주세요',
    },
  });


  const { field: body, fieldState: bodyState } = useController<PostFunnelStep>({
    control,
    name: 'body',
    defaultValue:'',
    rules: {
      required: '게시글 내용을 입력해주세요.',
      minLength: { value: 1, message: '게시글은 1자 이상 입력해주세요' },
      maxLength: { value: 1000, message: '게시글은 1000자 이하 입력해주세요' },
    },
  }); 
 
  const { field: rentalDuration, fieldState: rentalDurationState } = useController<PostFunnelStep>({
    control,
    name: 'rentalDuration',
    defaultValue:'',
    rules: {
      required: '대여 날짜를 골라주세요.',
    },
  });
  const { field: rentalFee, fieldState: rentalFeeState } = useController<PostFunnelStep>({
    control,
    name: 'rentalFee',
    defaultValue:'',
    rules: {
      required: '대여 금액을 입력해주세요.',
    },
  });
  const { field: rentalAddress, fieldState: rentalAddressState } = useController<PostFunnelStep>({
    control,
    name: 'rentalAddress',
    defaultValue:'',
    rules: {
      required: '대여 장소를 입력해주세요.',
    },
  });
  const { field: returnTypeList, fieldState: returnTypeListState } = useController<PostFunnelStep>({
    control,
    name: 'returnTypeList',
    defaultValue:'',
    rules: {
      required: '반납 방법을 정해주세요.',
    },
  });
  const { field: returnAddress, fieldState: returnAddressState } = useController<PostFunnelStep>({
    control,
    name: 'returnAddress',
    defaultValue:'',
    rules: {
      required: '반납 장소를 입력해주세요.',
    },
  });

  const postData = useState<PostInfo>({
    title: title.value as string,
    body: body.value as string,
    category: category.value as ProductCategory,
    images: images.value as File[]
  })

  const postDataState = useState({
    title:titleState,
    body:bodyState,
    category:categoryState,
    images:imagesState
  })

  const rentalData =useState<RentalInfo>({
    rentalDuration: rentalDuration.value as DateRange,
    rentalFee:rentalFee.value as number,
    returnTypeList: returnTypeList.value as string[],
    returnAddress: returnAddress.value as Location,
    rentalAddress: rentalAddress.value as Location
  })

  const rentalDataState =useState({
    rentalDuration: rentalDurationState,
    rentalFee:rentalDurationState,
    returnTypeList: rentalDurationState,
    returnAddress: rentalDurationState,
    rentalAddress: rentalDurationState,
  })

  return {postData,postDataState,rentalData,rentalDataState ,getValues,errors,isValid,handleSubmit}

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