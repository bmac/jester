type RecursivePartial<T> = {
  [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends Promise<infer U> ? Promise<RecursivePartial<U>> :
    T[P] extends object | undefined ? RecursivePartial<T[P]> :
    T[P];
};

export const stub = <T extends object>(descriptor?: RecursivePartial<T>) => {
  return { ...descriptor } as T;
};
