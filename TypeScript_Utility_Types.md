# TypeScript Utility Types (Object Transformers) — Revision Guide

- A reference guide covering built-in utility types (`Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`) and their shallow transformation behavior based on `026_shallow_util_object.ts`.

---

## Table of Contents

- [1. What are Utility Types?](#1-what-are-utility-types)
- [2. Quick Reference Summary Table](#2-quick-reference-summary-table)
- [3. The Base Model](#3-the-base-model)
- [4. Detailed Breakdown](#4-detailed-breakdown)
  - [1) `Partial<T>`](#1-partialt)
  - [2) `Required<T>`](#2-requiredt)
  - [3) `Readonly<T>` & The Shallow Caveat](#3-readonlyt--the-shallow-caveat)
  - [4) `Pick<T, K>`](#4-pickt-k)
  - [5) `Omit<T, K>`](#5-omitt-k)
  - [6) `Record<K, V>`](#6-recordk-v)
- [5. Key Takeaways](#5-key-takeaways)

---

## 1. What are Utility Types?

> **Definition:** **Utility types** are built-in generic helpers in TypeScript that transform an existing object type into a new variant, eliminating manual boilerplate.

* **Compile-Time Only:** Utility types exist strictly during type checking and emit no JavaScript runtime code.
* **Shallow by Default:** Standard utilities operate only on **top-level keys**; nested object properties retain their original modifiers.

---

## 2. Quick Reference Summary Table

| Utility Type | What It Does | Common Real-World Use Case |
| :--- | :--- | :--- |
| `Partial<T>` | Turns all top-level keys into optional (`?`) | `PATCH` API requests, update forms |
| `Required<T>` | Removes all `?` modifiers, making all fields mandatory | Strict runtime validators, completed state |
| `Readonly<T>` | Prepends `readonly` to all top-level fields | State management, frozen configurations |
| `Pick<T, K>` | Selects only specific keys `K` from `T` | Public DTOs, projection models |
| `Omit<T, K>` | Removes specified keys `K` from `T` | Stripping sensitive fields (e.g., passwords, tokens) |
| `Record<K, V>` | Constructs an object with key set `K` and value types `V` | Lookup dictionaries, indexed maps |

---

## 3. The Base Model

```ts
type Address = {
  line1: string;
  city: string;
};

type User = {
  id: string;
  name: string;
  email?: string; // Optional property
  address: Address;
};
```

## 4. Detailed Breakdown

### 1) Partial`<T>`

- Makes every top-level property optional. Ideal for patch operations where callers supply only modified fields.

```ts
type UserPatch = Partial<User>;

const patch1: UserPatch = { name: 'kapil' };
const patch2: UserPatch = { address: { line1: 'Main St', city: 'Kolkata' } };
```

### 2) Required`<T>`

- Strips all ? flags. Every field—even previously optional ones like email—becomes compulsory.

```ts
type FullUser = Required<User>;

const user: FullUser = {
  id: 'u2',
  name: 'Kapil',
  address: { line1: 'line2', city: 'Kolkata' },
  email: 'kapil@example.com', // Must be present; omitting causes a compile error
};
```

### 3) Readonly`<T>` & The Shallow Caveat

- Prevents direct reassignment of any top-level property. Because it is shallow, properties on nested objects remain mutable unless deeply protected.

```ts
type ReadonlyUser = Readonly<User>;

const user: ReadonlyUser = {
  id: 'u3',
  name: 'John',
  address: { line1: 'line3', city: 'Austin' },
};

// user.name = 'Dave'; 
// Error: Cannot assign to 'name' because it is a read-only property.

// Allowed because Readonly is shallow:
user.address.city = 'Houston'; // Nested mutation succeeds
```

### 4) Pick`<T, K>`

- Constructs a type including only the designated keys K.

```ts
type PublicUser = Pick<User, 'id' 'name' |>;

const publicProfile: PublicUser = {
  id: 'u5',
  name: 'Brock',
};
```

### 5) Omit`<T, K>`

- Constructs a type containing all properties of T except the excluded keys K.

```ts
type SafeUser = Omit<User, 'email'>;

const safeAccount: SafeUser = {
  id: 'u4',
  name: 'Virat',
  address: { line1: 'D', city: 'Delhi' },
};

// safeAccount.email = 'test@example.com';
// Error: Property 'email' does not exist on type 'SafeUser'.
```

### 6) Record`<K, V>`

- Maps a union of keys K to a uniform value structure V. Enforces that all keys in the union must be defined.

```ts
type Role = 'admin' | 'user' | 'editor';

type RoleDirectory = Record<Role, User>;

const directory: RoleDirectory = {
  admin: { id: '1', name: 'Admin', address: { line1: 'A', city: 'Sydney' } },
  user: { id: '2', name: 'User', address: { line1: 'B', city: 'Beijing' } },
  editor: { id: '3', name: 'Editor', address: { line1: 'C', city: 'Tokyo' } },
};

// Iterating keys safely with a type assertion:
(Object.keys(directory) as Role[]).forEach((role) => {
  console.log(`${role}: ${directory[role].name}`);
});
```

## 5. Key Takeaways

- Use `Pick` when selecting a small subset of properties from a large type.

- Use `Omit` when keeping almost everything except one or two fields.

- Remember that `Readonly<T>` and `Partial<T>` do not recurse into nested structures (address properties stay unchanged). Deep transformations require recursive types or custom helpers.
