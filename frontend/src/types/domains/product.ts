import { DateRange } from 'react-day-picker';
import { Location } from '@/types/domains/location';
import { FieldErrors, UseControllerReturn } from 'react-hook-form';

export type ProductStatus = 'AVAILABLE' | 'IN_PROGRESS' | 'FINISH';
export type ProductCategory = 'LIGHT_STICK' | 'SMART_PHONE' | 'TELESCOPE' | 'CAMERA_BODY' | 'CAMERA_LENS' | 'ETC';

export type ReturnType = 'DIRECT' | 'DELIVERY';

export type PostProcess = 'PostInfoStep' | 'RentalInfoStep' | 'ContractInfoStep' | 'ContractPreviewStep';

export type PostInfo = {
  title: string;
  body: string;
  category: ProductCategory;
  images: (string | ArrayBuffer | null)[] | File[];
};

export type RentalInfo = {
  rentalDuration: DateRange;
  rentalFee: number;
  returnTypeList: string[];
  returnAddress: Location;
  rentalAddress: Location;
};

export type ContractInfo = {
  productName: string;
  serialNumber: string;
  repairVendor: string;
  overdueCriteria: number;
  overdueFee: number;
  theftCriteria: number;
  refundDeadline: number;
};

// 기존 타입들을 PostInfo와 RentalInfo를 조합하여 재정의
export type PostInfoStep = Partial<PostInfo> & Partial<RentalInfo> & Partial<ContractInfo>;
export type RentalInfoStep = PostInfo & Partial<RentalInfo> & Partial<ContractInfo>;
export type ContractInfoStep = PostInfo & RentalInfo & Partial<ContractInfo>;
export type ContractPreviewStep = PostInfo & RentalInfo & ContractInfo;

export type StepProps<T> = {
  fields: T;
  errors: FieldErrors<PostFunnelStep>;
  context: PostInfoStep | RentalInfoStep | ContractInfoStep | ContractPreviewStep;
  isValid: boolean;
};
export type PostFunnelStep = PostInfo & RentalInfo & ContractInfo;
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
export type ContractFormFields = {
  productName: UseControllerReturn<PostFunnelStep>;
  serialNumber: UseControllerReturn<PostFunnelStep>;
  repairVendor: UseControllerReturn<PostFunnelStep>;
  overdueCriteria: UseControllerReturn<PostFunnelStep>;
  overdueFee: UseControllerReturn<PostFunnelStep>;
  theftCriteria: UseControllerReturn<PostFunnelStep>;
  refundDeadline: UseControllerReturn<PostFunnelStep>;
};
