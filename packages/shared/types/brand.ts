export type Brand<K, T> = K & { __brand: T };

export const unsafeForceBrandToType = <TO extends TI, TI = unknown>(
  value: TI
): TO => {
  return value as unknown as TO;
};
