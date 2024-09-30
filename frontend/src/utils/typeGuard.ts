// else 문 마지막에 쓸 함수
// eslint-disable-next-line import/prefer-default-export
export const neverExpected = (value: never): never => {
  throw new Error(`Never Type이 와야합니다: ${value}`);
};
