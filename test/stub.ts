type RecursivePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? RecursivePartial<U>[]
    : T[P] extends Promise<infer U>
      ? Promise<RecursivePartial<U>>
      : T[P] extends object | undefined
        ? RecursivePartial<T[P]>
        : T[P];
};

/**
   Identity function that casts an object to the specified type. Used
   for creating a stub value in a unit test that doesn't have some
   required property that isn't needed by the behavior under test so
   its addition adds noise to the test setup.

   In may cases you can use `as Type` to get the same behavior with
   less code but TypeScript's rules don't always let you do that with
   more complex types. `stub` is there for those cases so you don't
   have to case through unknown and loose type information.

   Example:
   type User = { id: number; name: string; };

   // name isn't a concern of this test so we use stub to omit it
   const negativIdUser = stub<User>({id: -1});
   expect(isValidUser(negativIdUser)).toBe(false);
 */
export const stub = <T extends object>(descriptor?: RecursivePartial<T>) => {
  return { ...descriptor } as T;
};
