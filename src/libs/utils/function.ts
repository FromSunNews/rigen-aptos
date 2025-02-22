export function filterFieldsObjectArray(updateData: { [key: string]: any }[], fieldName: string[]) {
  return updateData.map((item) => {
    const o: any = {};
    Object.keys(item).forEach((key) => {
      if (fieldName.includes(key)) o[key] = item[key];
    });
    return o;
  });
}

/**
 * Merge two arrays of objects based on a common key
 * @param arr1 The first array
 * @param arr2 The second array
 * @param key The key to merge on (must exist in both objects)
 * @returns A new array containing the merged objects
 */
export function mergeArraysByKey<K extends PropertyKey, T extends { [P in K]: any }, U extends { [P in K]: T[K] }>(
  arr1: T[],
  arr2: U[],
  key: K
): (T & Partial<U>)[] {
  return arr1.map((item1) => {
    const matchingItem = arr2.find((item2) => item2[key] === (item1[key] as any));
    return {
      ...item1,
      ...(matchingItem || {}),
    };
  });
}
