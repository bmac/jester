export const stub = <T extends object>(descriptor?: Partial<T>) => {
  return { ...descriptor } as T;
};
