//! Utility Types в TypeScript — это встроенные вспомогательные типы, которые позволяют удобно модифицировать существующие типы.

interface Post {
  id: number;
  title: string;
  published?: boolean;
}

type ReadonlyPost = Readonly<Post>; // все поля только для чтения
type PostPreview = Omit<Post, "published">; // убрали published
type PostDraft = Required<Post>; // все поля обязательные
type PartialPost = Partial<Post>; // все поля необязательные
type PickPost = Pick<Post, "id" | "title">; // взяли только нужные


//! Partial<T> (Все поля типа T делает необязательными)
interface User {
    name: string;
    age: number;
}
const user: Partial<User> = { name: "Илья" }; // age — необязателен

//! Required<T> (Все поля делает обязательными)
type FullUser = Required<Partial<User>>; // снова делает все поля обязательными

//! Readonly<T> (Все поля делает только для чтения (readonly))
const readonlyUser: Readonly<User> = {
    name: "Илья",
    age: 25,
};
// readonlyUser.age = 30; // ❌ ошибка — нельзя изменить

//! Pick<T, K> (Оставляет только выбранные ключи K)
//! Omit<T, K> (Исключает указанные ключи K)
type NameOnly = Pick<User, "name">; // { name: string }
type WithoutAge = Omit<User, "age">; // { name: string }

//! Record<K, T> (Создаёт объект с ключами K и значениями типа T)
type Roles = "admin" | "user" | "guest";
const permissions: Record<Roles, boolean> = {
    admin: true,
    user: true,
    guest: false,
};

//! Exclude<T, U> (Удаляет из T те типы, которые входят в U)
//! Extract<T, U> (Оставляет из T только те, что входят в U)
type T = "a" | "b" | "c";
type WithoutB = Exclude<T, "b">; // "a" | "c"
type OnlyB = Extract<T, "b">; // "b"

//! NonNullable<T> (Убирает null и undefined из типа T)
type MaybeName = string | null | undefined;
type Name = NonNullable<MaybeName>; // string

//! ReturnType<T> (Получает тип возвращаемого значения функции T)
function getUser() {
    return { name: "Илья", age: 25 };
}
type UserType = ReturnType<typeof getUser>; // { name: string; age: number }
