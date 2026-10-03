# TypeScript Type-Safe Property Accessors — Revision Guide

- A reference guide covering indexed access types (`T[K]`), `keyof` constraints, and building type-safe dynamic getters and setters based on `025_generics_getProp.ts`.

---

## Table of Contents

- [1. Core Concepts & Definitions](#1-core-concepts--definitions)
- [2. The Model Object](#2-the-model-object)
- [3. Type-Safe Dynamic Getter](#3-type-safe-dynamic-getter)
- [4. Type-Safe Dynamic Setter](#4-type-safe-dynamic-setter)
- [5. Compile-Time vs. Runtime Behavior](#5-compile-time-vs-runtime-behavior)

---

## 1. Core Concepts & Definitions

| Concept | Syntax / Symbol | Simplified Meaning | Example |
| :--- | :--- | :--- | :--- |
| **Generic Type** | `<T>` | A placeholder for any object type passed in | `getUserProp(u, 'id')` infers `T = User` |
| **Key Union** | `keyof T` | A union containing all valid property names of `T` | `'id' \| 'name' \| 'email' \| 'phone'` |
| **Key Constraint** | `K extends keyof T` | Guarantees that `K` must be one of the known keys of `T` | Passing `'age'` fails compile-time checks |
| **Indexed Access Type** | `T[K]` | Resolves the exact type of property `K` on object `T` | `User['phone']` → `number \| undefined` |
| **Optional Field** | `prop?: Type` | The field may be missing; its type union includes `undefined` | `email?: string` → `string \| undefined` |

---

## 2. The Model Object

```ts
type User = {
  id: string;
  name: string;
  email?: string; // T['email'] -> string | undefined
  phone?: number; // T['phone'] -> number | undefined
};

const user: User = {
  id: 'u1',
  name: 'kapil',
  phone: 123456789,
};
```

## 3. Type-Safe Dynamic Getter

- By combining `<T, K extends keyof T>` with the return type `T[K]`, TypeScript guarantees that reading a property returns its exact corresponding type:

```ts
function getUserProp<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const idVal = getUserProp(user, 'id');       // Inferred as string
const nameVal = getUserProp(user, 'name');   // Inferred as string
const emailVal = getUserProp(user, 'email'); // Inferred as string | undefined
const phoneVal = getUserProp(user, 'phone'); // Inferred as number | undefined

// Compiler Safety Check:
// getUserProp(user, 'age');
// Error: Argument of type '"age"' is not assignable to parameter of type 'keyof User'.
```

## 4. Type-Safe Dynamic Setter

- The setter pairs `key: K` with `newVal: T[K]`. TypeScript ensures that:

1. You only modify existing properties on the object.

2. The value you assign strictly conforms to the expected type of that specific property.

```ts
function setUserProp<T, K extends keyof T>(
  obj: T,
  key: K,
  newVal: T[K]
): void {
  obj[key] = newVal;
}

// Valid mutations:
setUserProp(user, 'name', 'john');                  // OK: 'name' expects string
setUserProp(user, 'email', 'john@example.com');     // OK: 'email' expects string | undefined
setUserProp(user, 'phone', 987654321);              // OK: 'phone' expects number | undefined

// Blocked at compile time:
// setUserProp(user, 'phone', 'not-a-number');
// Error: Argument of type 'string' is not assignable to parameter of type 'number | undefined'.

// setUserProp(user, 'age', 25);
// Error: Argument of type '"age"' is not assignable to parameter of type 'keyof User'.
```

## 5. Compile-Time vs. Runtime Behavior

| Operation | Code | TypeScript Type Checking | Runtime Output |
| :--- | :--- | :--- | :--- |
| **Get Existing Property** | `getUserProp(user, 'name')` | Valid → returns `string` | `'kapil'` |
| **Get Unset Optional Property** | `getUserProp(user, 'email')` | Valid → returns `string \| undefined` | `undefined` |
| **Get Non-Existent Key** | `getUserProp(user, 'role')` | **Compile Error** (`'role'` not in `keyof T`) | Prevented before running |
| **Set Valid Property** | `setUserProp(user, 'phone', 999)` | Valid → updates object, returns `void` | `undefined` |
| **Set Invalid Value Type** | `setUserProp(user, 'phone', 'xyz')` | **Compile Error** (`string` not assignable to `T['phone']`) | Prevented before running |
