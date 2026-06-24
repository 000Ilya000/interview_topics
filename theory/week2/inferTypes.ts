//! INFER — извлечение типов внутри conditional/mapped types

type ElementType<T> = T extends (infer U)[] ? U : never;

type Num = ElementType<number[]>; // number

type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

function getUser() {
  return { id: 1, name: "Ilya" };
}

type User = MyReturnType<typeof getUser>;

type AwaitedCustom<T> = T extends Promise<infer U> ? U : T;

type FirstParam<T> = T extends (first: infer F, ...args: never[]) => unknown ? F : never;

type Head<T extends unknown[]> = T extends [infer H, ...unknown[]] ? H : never;

export type { ElementType, MyReturnType, User };
