export type Response<T> = {
  header: {
    httpStatusCode: number;
    message: string;
  };
  body: T;
};
