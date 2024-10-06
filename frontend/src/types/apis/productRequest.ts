export type ContractConditionRequest = {
  productName: string;
  serialNumber: string;
  repairVendor: string;
  overdueCriteria: number;
  overdueFee: number;
  theftCriteria: number;
  refundDeadline: number;
};

export type ProductAddRequest = {
  title: string;
  startDate: Date;
  endDate: Date;
  rentalFee: number;
  place: string;
  latitude: number;
  longitude: number;
  returnTypeList: string[];
  returnAddress: string;
  content: string;
  category: string;
  contractConditionReq: ContractConditionRequest;
};
