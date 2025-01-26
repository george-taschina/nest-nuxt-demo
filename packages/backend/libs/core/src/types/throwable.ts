const errorType = Symbol('A property only there to store types');

export interface Throwable<T extends Error> {
  [errorType]?: T;
}

type getThrowableType<T> = T extends Throwable<infer R> ? R : never;

type basicFunction = (...any: any[]) => any;

export type exceptionOf<T extends basicFunction> = getThrowableType<
  ReturnType<T>
>;

export const getTypedError = <T extends basicFunction>(
  error: unknown,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  throwableMethod: T
) => error as exceptionOf<T>;
