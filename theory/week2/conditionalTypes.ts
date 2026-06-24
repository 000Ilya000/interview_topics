//! CONDITIONAL TYPES — T extends U ? X : Y

type IsString<T> = T extends string ? true : false;

type MyExclude<T, U> = T extends U ? never : T;

type ToArray<T> = T extends unknown ? T[] : never;
// string | number → string[] | number[] (distributive)

type ToArrayNonDist<T> = [T] extends [unknown] ? T[] : never;
// (string | number)[] — без distributive

type ApiResponse<T> = T extends string
  ? { message: T }
  : T extends number
    ? { code: T }
    : { data: T };

export type { IsString, MyExclude, ToArray, ApiResponse };
