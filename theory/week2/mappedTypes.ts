//! MAPPED TYPES — { [K in keyof T]: ... }

interface User {
  id: number;
  name: string;
  email: string;
}

type MyPartial<T> = { [K in keyof T]?: T[K] };
type MyReadonly<T> = { readonly [K in keyof T]: T[K] };
type MyPick<T, K extends keyof T> = { [P in K]: T[P] };

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};

type FilterByType<T, V> = {
  [K in keyof T as T[K] extends V ? K : never]: T[K];
};

export type { MyPartial, MyPick, Getters, FilterByType };
