export type ContractConditionRequest = {
  productName: string;
  serialNumber: string;
  repairVendor: string;
  overdueCriteria: number;
  overdueFee: number;
  theftCriteria: number;
  refundDeadline: number;
};
