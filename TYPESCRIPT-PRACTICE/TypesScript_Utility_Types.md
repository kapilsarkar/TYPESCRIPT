# Utility Types: Revision Notes

Revision notes for `utility-types.ts`.

Run the file with:

```bash
npx ts-node utility-types.ts
```

---

## What are utility types?

Built-in TypeScript tools that create a **new type** from an existing one, so you do not have to rewrite it.

---

## What the file covers

1. Nested interfaces (`User`, `Address`, `Geo`, `Company`)
2. `Partial<T>`
3. `Required<T>`
4. `Readonly<T>`
5. `Pick<T, Keys>`
6. `Omit<T, Keys>`
7. `Record<Keys, Type>`

---

## 1. Nested interfaces

Interfaces can describe nested objects. They can also be used before they are written in the file, so `Address` can use `Geo` even though `Geo` is declared below it.

```typescript
interface Geo { lat: string; lng: string; }

interface Address {
    street: string;
    city: string;
    geo: Geo;          // nested object
}

interface User {
    id: number;
    name: string;
    address: Address;
}
```

---

## 2. `Partial<T>`

Makes **all properties optional**. Useful for updates where only some fields are sent.

```typescript
type PartialUser = Partial<User>;

const partialUser: PartialUser = { id: 1, name: "myname" };
```

Real use: an update function. The spread (`...`) copies the old user, then `updates` overwrite matching fields. The original is not changed.

```typescript
function updateUser(current: User, updates: Partial<User>): User {
    return { ...current, ...updates };
}
```

---

## 3. `Required<T>`

Makes **all properties required** (the opposite of `Partial`).

```typescript
type Settings = { theme?: string; fontSize?: number };
type FullSettings = Required<Settings>;

const settings: FullSettings = { theme: "dark", fontSize: 14 };
// { theme: "dark" }   // Error: 'fontSize' is missing
```

`Required<User>` is the same as `User`, because every property in `User` is already required. `Required` only changes types that have optional (`?`) properties.

---

## 4. `Readonly<T>`

Makes **all properties read-only**.

```typescript
type ReadonlyUser = Readonly<User>;

// user3.name = "Kapil";   // Error: Cannot assign to 'name' because it is a read-only property
```

`Readonly` is **shallow**. Only top-level properties are locked.

```typescript
// user3.address.city = "Kolkata";   // NOT an error: address is an object whose properties are still editable
```

---

## 5. `Pick<T, Keys>`

Creates a new type with **only the chosen properties**.

```typescript
type UserSummary = Pick<User, "id" | "name" | "email">;

function getUserSummary(u: User): UserSummary {
    return { id: u.id, name: u.name, email: u.email };
}
```

---

## 6. `Omit<T, Keys>`

Creates a new type with **every property except the chosen ones** (the opposite of `Pick`).

```typescript
type BasicUser = Omit<User, "address" | "company">;
```

---

## 7. `Record<Keys, Type>`

Creates an object type with a set of keys, all having the same value type. Handy for lookups.

```typescript
type UsersById = Record<number, User>;
const usersById: UsersById = { 1: user };

type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
};
```

When the keys are a fixed set of strings, every key must be present.

---

## Quick reference

| Utility type | What it does |
|--------------|--------------|
| `Partial<T>` | All properties optional |
| `Required<T>` | All properties required |
| `Readonly<T>` | All properties read-only (shallow) |
| `Pick<T, K>` | Keep only the chosen properties |
| `Omit<T, K>` | Remove the chosen properties |
| `Record<K, V>` | Object with keys `K` and values `V` |

---

## Common mistakes to remember

1. `Required<T>` does nothing if every property is already required.
2. `Readonly<T>` is shallow: nested objects can still be changed.
3. `Pick` and `Omit` take property names as string literals, joined with `|` (for example `"id" | "name"`).
4. `Record<Role, ...>` with a fixed set of keys needs every key to be present.
5. `Partial<T>` makes every field optional, including ones that should stay required. Check for `undefined` before using a value.
6. Utility types only exist at compile time. They are removed when the code is compiled to JavaScript.