import store from "@/store";
import { grpc } from "@improbable-eng/grpc-web";
import { create, all } from "mathjs";
type ConfigOptions = {
  number?: "number" | "BigNumber" | "Fraction" | undefined;
  precision?: number;
};
const mathConfig:ConfigOptions = {
  number: "BigNumber",
  precision: 20,
};

export const metaData = () => {
  let accessToken = store.getters["auth/accessToken"];
  let authHeader = "Authorization";
  let metadata = new grpc.Metadata();
  metadata.set(authHeader, accessToken);
  return metadata;
};

export const FormatAmount = (amount: any) => {
  if (amount == null || amount == undefined || amount == "") {
    return 0;
  }
  let neAm = +amount;
  if (typeof neAm !== "number") {
    return 0;
  }

  const suffixes = ["", "k", "m", "b", "t"];
  let suffixIndex = 0;

  while (neAm >= 1000 && suffixIndex < suffixes.length - 1) {
    neAm /= 1000;
    suffixIndex++;
  }
  const decimalPrecision = Math.min(6, Math.max(2, getDecimalLength(neAm)));

  const formattedAmount = Number(neAm.toFixed(decimalPrecision)).toFixed(2) + suffixes[suffixIndex];
  return formattedAmount;
};
const getDecimalLength = (number: number): number => {
  const numberString = number.toString();
  const decimalIndex = numberString.indexOf('.');
  return decimalIndex !== -1 ? numberString.length - decimalIndex - 1 : 0;
};
export const MathAddition = (
  a: string | number,
  b: string | number,
  precision?: number
) => {
  if (precision != undefined && precision > 0) {
    mathConfig.precision = precision;
  }
  const math = create(all, mathConfig);

  return math.add(math.bignumber(a), math.bignumber(b)).toString();
};
export const MathDivide = (
  a: string | number,
  b: string | number,
  precision?: number
) => {
  if (precision != undefined && precision > 0) {
    mathConfig.precision = precision;
  }
  const math = create(all, mathConfig);

  return math.divide(math.bignumber(a), math.bignumber(b)).toString();
};
export const MathSubtract = (
  a: string | number,
  b: string | number,
  precision?: number
) => {
  if (precision != undefined && precision > 0) {
    mathConfig.precision = precision;
  }
  const math = create(all, mathConfig);

  return math.subtract(math.bignumber(a), math.bignumber(b)).toString();
};
export const MathMultiply = (
  a: string | number,
  b: string | number,
  precision?: number
) => {
  if (precision != undefined && precision > 0) {
    mathConfig.precision = precision;
  }
  const math = create(all, mathConfig);

  return math.multiply(math.bignumber(a), math.bignumber(b)).toString();
};
export const MathIsLessThanOrEqual = (a: string | number, b: string | number) => {
  const math = create(all, mathConfig);
  if (math.smallerEq(a, b)) {
    return true;
  }
  return false;
};
export const MathIsGreaterThanOrEqual = (a: string | number, b: string | number) => {
  const math = create(all, mathConfig);
  if (math.largerEq(a, b)) {
    return true;
  }
  return false;
};
