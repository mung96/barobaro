export type PostInput = {
  title?: string;
  rentalStart?: string;
  rentalEnd?: string;
  body?: string;
  pictures?: File[];
  other?: unknown;
};

export type ContractInput = {
  title: string;
  rentalStart: string;
  rentalEnd: string;
  body: string;
  pictures: File[];
  other: unknown;
};

export type Complete = {
  title: string;
  rentalStart: string;
  rentalEnd: string;
  body: string;
  pictures: File[];
  other: unknown;
};
