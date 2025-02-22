import { BigNumber } from "ethers";

export const sortNumber = (a: string | number, b: string | number) => {
  const A = Number(a);
  const B = Number(b);
  return B - A;
};

export const sortBigNumber = (a: string | number, b: string | number) => {
  const A = BigNumber.from(a);
  const B = BigNumber.from(b);
  return B.sub(A).toNumber();
};
