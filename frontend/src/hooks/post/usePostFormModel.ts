import { useCallback, useMemo } from 'react';
import {
  ContractInfoStep,
  ContractPreviewStep,
  PostInfoStep,
  RentalInfoStep,
  PostFunnelStep,
  PostFormFields,
  RentalFormFields,
  ContractFormFields,
} from '@/types/domains/product';
import { useController, useForm } from 'react-hook-form';

import { IMAGE_MAX_LENGTH, IMAGE_MIN_LENGTH, POST_FIELD_CONFIG } from '@/constants/post';
import { formatDate } from '@/utils/dayUtil';
import { postProduct } from '@/apis/productApi';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { ContractConditionRequest } from '@/types/apis/productRequest';
import { fi } from '@faker-js/faker';

const usePostFormModel = (context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep) => {
  const router = useRouter();
  const {
    getValues,
    control,
    formState: { errors, isValid: isFormValid, isSubmitting },
    handleSubmit,
  } = useForm<PostFunnelStep>({
    mode: 'onChange',
  });

  // 게시글 필드
  const title = useController<PostFunnelStep>({
    control,
    name: 'title',
    ...POST_FIELD_CONFIG.TITLE,
  });
  const images = useController<PostFunnelStep>({
    control,
    name: 'images',
    ...POST_FIELD_CONFIG.IMAGES,
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

  // 대여정보
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

  // 계약서
  const productName = useController<PostFunnelStep>({
    control,
    name: 'productName',
    ...POST_FIELD_CONFIG.PRODUCT_NAME,
  });
  const serialNumber = useController<PostFunnelStep>({
    control,
    name: 'serialNumber',
    ...POST_FIELD_CONFIG.SERIAL_NUMBER,
  });
  const repairVendor = useController<PostFunnelStep>({
    control,
    name: 'repairVendor',
    ...POST_FIELD_CONFIG.REPAIR_VENDOR,
  });
  const overdueCriteria = useController<PostFunnelStep>({
    control,
    name: 'overdueCriteria',
    ...POST_FIELD_CONFIG.OVERDUE_CRITERIA,
  });
  const overdueFee = useController<PostFunnelStep>({
    control,
    name: 'overdueFee',
    ...POST_FIELD_CONFIG.OVERDUE_FEE,
  });
  const theftCriteria = useController<PostFunnelStep>({
    control,
    name: 'theftCriteria',
    ...POST_FIELD_CONFIG.THEFT_CRITERIA,
  });
  const refundDeadline = useController<PostFunnelStep>({
    control,
    name: 'refundDeadline',
    ...POST_FIELD_CONFIG.REFUND_DEADLINE,
  });

  const postFieldList = {
    title,
    body,
    category,
    images,
  };
  const rentalFieldList = {
    rentalDuration,
    rentalFee,
    returnTypeList,
    returnAddress,
    rentalAddress,
  };

  const contractFieldList = {
    productName,
    serialNumber,
    repairVendor,
    overdueCriteria,
    overdueFee,
    theftCriteria,
    refundDeadline,
  };

  // const fieldMapInvalid = (fieldList: PostFormFields | RentalFormFields | ContractFormFields) =>
  //   Object.values(fieldList).every((field) => !field.fieldState.invalid && field.field.value);

  const fieldMapInvalid = (fieldList: PostFormFields | RentalFormFields | ContractFormFields) =>
    Object.values(fieldList).every((field) => {
      if (field.field.name === 'returnAddress') {
        return true; // returnAddress는 검사에서 제외
      }
      if (Array.isArray(field.field.value)) {
        return field.field.value.length > 0;
      }
      return !field.fieldState.invalid && field.field.value;
    });

  const isFieldValid = useMemo(
    () => ({
      //TODO: merge시에 주석풀어야함.
      postFieldList:
        fieldMapInvalid(postFieldList) &&
        (images.field.value as File[]).length >= IMAGE_MIN_LENGTH &&
        (images.field.value as File[]).length <= IMAGE_MAX_LENGTH,
      rentalFieldList: fieldMapInvalid(rentalFieldList),
      contractFieldList: fieldMapInvalid(contractFieldList),
    }),
    [postFieldList, rentalFieldList, contractFieldList],
  );

  const convertProductDataToRequest = () => {
    return {
      title: context.title!,
      startDate: formatDate(context.rentalDuration?.from!),
      endDate: formatDate(context.rentalDuration?.to!),
      rentalFee: context.rentalFee!,
      place: context.rentalAddress?.addressName!,
      latitude: Number(context.rentalAddress?.latitude!),
      longitude: Number(context.rentalAddress?.longitude!),
      returnTypeList: context.returnTypeList!,
      returnAddress: context.returnAddress?.addressName!,
      content: context.body!,
      category: context.category!,
    };
  };
  const convertContractDataToRequest = (): ContractConditionRequest => {
    return {
      productName: context.productName!,
      serialNumber: context.serialNumber!,
      repairVendor: context.repairVendor!,
      overdueCriteria: context.overdueCriteria!,
      overdueFee: context.overdueFee!,
      theftCriteria: context.theftCriteria!,
      refundDeadline: context.refundDeadline!,
    };
  };

  const postProductWithoutContract = useCallback(
    handleSubmit(async () => {
      try {
        const response = await postProduct(convertProductDataToRequest(), context.images! as File[]);
        const productId = response.data.body.productId;
        router.replace(`/post/${productId}`);
      } catch (error) {
        if (isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    }),
    [context],
  );

  const postProductWithContract = useCallback(
    handleSubmit(async () => {
      try {
        const response = await postProduct(
          {
            ...convertProductDataToRequest(),
            contractConditionReq: { ...convertContractDataToRequest() },
          },
          context.images! as File[],
        );
        const productId = response.data.body.productId;
        router.replace(`/post/${productId}`);
      } catch (error) {
        if (isAxiosError(error)) {
          alert(error.response?.data.message);
        }
      }
    }),
    [context],
  );

  return {
    postFieldList,
    rentalFieldList,
    contractFieldList,
    getValues,
    errors,
    isFormValid,
    isFieldValid,
    isSubmitting,
    postProductWithoutContract,
    postProductWithContract,
  };
};

export default usePostFormModel;
