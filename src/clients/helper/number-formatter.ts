import { BigNumber } from "@ethersproject/bignumber";
import { formatUnits } from "ethers/lib/utils";

// Important constants
const WAD = BigNumber.from("1000000000000000000"); // 10^18
const RAY = BigNumber.from("1000000000000000000000000000"); // 10^27
const HALF_WAD = WAD.div(2);
const HALF_RAY = RAY.div(2);

type NumberType = number | string | string[] | BigNumber;

// Helper class for handling numbers in the frontend
export class nf {
  // stand for NumberFormatter
  private static processNumbers(...values: NumberType[]): BigNumber[] {
    return values.map((value) => BigNumber.from(value));
  }

  private static formatFixedUnit(value: string, fixedUnit?: number): string {
    if (fixedUnit) {
      return Number(value).toFixed(fixedUnit);
    }
    return value;
  }

  // Convert any number to decimal for display
  static format(value: NumberType, fixedUnit: number = 0, decimals: number): string {
    const [processedValue] = this.processNumbers(value);
    const formatted = formatUnits(processedValue, decimals);
    return this.formatFixedUnit(formatted, fixedUnit);
  }

  static mulDecimals(value: NumberType, decimals: number): BigNumber {
    return BigNumber.from(value).mul(BigNumber.from(10).pow(decimals));
  }

  static toNumber(value: NumberType): number {
    return Number(value.toString());
  }

  // Convert WAD number to decimal for display
  static formatWad(wadValue: NumberType, fixedUnit: number = 0, decimals = 18): string {
    const [processedValue] = this.processNumbers(wadValue);
    const formatted = formatUnits(processedValue, decimals);
    return this.formatFixedUnit(formatted, fixedUnit);
  }

  // Convert RAY number to decimal for display
  static formatRay(rayValue: NumberType, fixedUnit: number = 0, decimals: number = 27): string {
    const [processedValue] = this.processNumbers(rayValue);
    const formatted = formatUnits(processedValue, decimals);
    return this.formatFixedUnit(formatted, fixedUnit);
  }

  static formatPercent(a: NumberType, b: NumberType): string {
    const [processedA, processedB] = this.processNumbers(a, b);
    if (processedB.isZero()) return "0";
    const formatted = processedA.mul(100).div(processedB).toString();
    return `${formatted}`;
  }

  // Convert decimal number to WAD
  static toWad(value: NumberType): BigNumber {
    return BigNumber.from(value).mul(WAD);
  }

  // Convert decimal number to RAY
  static toRay(value: NumberType): BigNumber {
    return BigNumber.from(value).mul(RAY);
  }

  // Format percentage from RAY (e.g., interest rate)
  static formatRayToPercent(rayValue: NumberType, decimals = 2): string {
    const [processedValue] = this.processNumbers(rayValue);
    const percent = formatUnits(processedValue, 27);
    const formatted = (Number(percent) * 100).toString();
    return `${this.formatFixedUnit(formatted, decimals)}%`;
  }

  // Handle calculations with WAD
  static wadMul(a: NumberType, b: NumberType): BigNumber {
    const [processedA, processedB] = this.processNumbers(a, b);
    return processedA.mul(processedB).add(HALF_WAD).div(WAD);
  }

  static wadDiv(a: NumberType, b: NumberType): BigNumber {
    const [processedA, processedB] = this.processNumbers(a, b);
    return processedA.mul(WAD).add(processedB.div(2)).div(processedB);
  }

  // Handle calculations with RAY
  static rayMul(a: NumberType, b: NumberType): BigNumber {
    const [processedA, processedB] = this.processNumbers(a, b);
    return processedA.mul(processedB).add(HALF_RAY).div(RAY);
  }

  static rayDiv(a: NumberType, b: NumberType): BigNumber {
    const [processedA, processedB] = this.processNumbers(a, b);
    return processedA.mul(RAY).add(processedB.div(2)).div(processedB);
  }
}
