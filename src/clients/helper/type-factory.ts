// Generic type to reuse with multiple data types
/**
 * @description Omit properties from a type
 * @example
 * type A = OmitProperties<{a: number, b: string, c: boolean}, "a" | "c">;
 * // A will be {b: string}
 * // or
 * const omit = ["a", "c"] as const;
 * type A = OmitProperties<{
 *     a: number;
 *     b: string;
 *     c: boolean;
 * }, typeof omit[number]>;
 * // A will be {b: string}
 */
export type OmitProperties<T, K extends keyof T> = Omit<T, K>;

/**
 * @description Pick properties from a type
 * @example
 * type A = PickProperties<{a: number, b: string, c: boolean}, "a" | "c">;
 * // A will be {a: number, c: boolean}
 */
export type PickProperties<T, K extends keyof T> = Pick<T, K>;

/**
 * @description Pick all required properties
 * @example
 * type A = PickRequiredProperties<{a: number, b?: string, c: boolean}>;
 * // A will be {a: number, c: boolean}
 */
export type PickRequiredProperties<T> = {
  [P in keyof T]-?: T[P];
};

/**
 * @description Filter properties based on a condition
 * @example
 * type A = FilterPoolData<{a: number, b: string, c: boolean}, number>;
 * // A will be "a"
 */
export type FilterPoolData<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];
