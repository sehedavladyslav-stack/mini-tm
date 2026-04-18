export type Brand<T, B extends string> = T & { readonly __brand: B };

export type TaskId = Brand<string, 'TaskId'>;