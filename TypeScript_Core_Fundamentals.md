# TypeScript Core Fundamentals — Revision Guide

A concise cheat sheet covering core TypeScript building blocks based on modules 01 to 08.

---

## Table of Contents

- [1. Type Inference & Annotations (`01_inference.ts`)](#1-type-inference--annotations-01_inferencets)
- [2. Primitives & Symbols (`02_primitive.ts`)](#2-primitives--symbols-02_primitivets)
- [3. Special Types (`03_special.ts`)](#3-special-types-03_specialts)
- [4. Object Types & Index Signatures (`04_objects.ts`)](#4-object-types--index-signatures-04_objectsts)
- [5. Literal Types & Widening (`05_literals.ts`)](#5-literal-types--widening-05_literalsts)
- [6. Type Assertions & Custom Type Guards (`06_assertions.ts`)](#6-type-assertions--custom-type-guards-06_assertionsts)
- [7. as const Assertions (`07_as_consts.ts`)](#7-as-const-assertions-07_as_conststs)
- [8. Unions & Narrowing (`08_unions.ts`)](#8-unions--narrowing-08_unionsts)
  - [Discriminated Unions](#discriminated-unions)
  - [Union of Arrays vs. Array of Unions](#union-of-arrays-vs-array-of-unions)

---

## 1. Type Inference & Annotations (`01_inference.ts`)

TypeScript infers types automatically whenever possible.

- **`let` vs `const`:**
  - `let count = 0;` $\rightarrow$ inferred as `number` (value can change).
  - `const site = "accedevhub";` $\rightarrow$ inferred as literal `"accedevhub"`.
- **When to annotate:**
  - Function parameters and return values.
  - When a variable declaration and assignment are separated.
  - When a value can take multiple shapes (`let maybe: string | number`).
- Avoid over-annotating simple primitives; let TypeScript do the heavy lifting to keep code readable.

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

## 2. Primitives & Symbols (`02_primitive.ts`)

- Basic types include string, number, boolean, bigint, and symbol.

  - BigInt vs Number: You cannot mix bigint and number in arithmetic operations directly without explicit conversion.

  - Unique Symbol: Represents completely unique, immutable identifiers.

```ts
const big: bigint = 2n ** 63n - 1n;
const age: number = 34;
// const invalid = big + age; // Error: Cannot mix BigInt and Number

const TOKEN: unique symbol = Symbol('TOKEN');
```

## 3. Special Types (`03_special.ts`)

| Type | Meaning | Use Case |
| :--- | :--- | :--- |
| `void` | Absence of any value returned | Functions that perform side effects without a `return` |
| `never` | Value that never occurs | Functions that always throw an error or run an infinite loop |
| `any` | Turns off type checking | Avoid; loses all compile-time type safety |
| `unknown` | Type-safe counterpart of `any` | External inputs; must be narrowed before use |

- Strict Null Checks: Variables cannot hold undefined or null unless explicitly typed in a union (string | undefined).

## 4. Object Types & Index Signatures (`04_objects.ts`)

- `readonly`: Prevents property reassignment after creation.

- Optional Properties (`?`):

  - `email?`: string means the property key can be omitted entirely.

  - `email: string | undefined` means the property key must exist, but its value can be undefined.

```ts
type User = {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
};
```

- Dynamic Keys:
  
  - Dynamic Index Signature: `type Count = { [k: string]: number }`

  - Fixed Key Record: `type Count = Record<'Likes' | 'Views', number>`

## 5. Literal Types & Widening (`05_literals.ts`)

- A literal type narrows a primitive to an exact value (e.g., "left" instead of string).

```ts
type Direction = "left" | "right" | "up";

const d1 = "left";        // Inferred as literal "left" -> valid for Direction
let d2 = "left";          // Widened to string -> fails assignment to Direction
let d3: Direction = "left"; // Explicitly typed -> valid
```

## 6. Type Assertions & Custom Type Guards (`06_assertions.ts`)

- as Assertion: Tells the compiler "trust me, I know the type." It bypasses safety checks at runtime.

- Custom Type Guard (v is T): Safely validates shape at runtime while informing the TypeScript compiler.

```ts
type User = { id: number; name: string };

function isUser(v: unknown): v is User {
  return (
    typeof v === 'object' &&
    v !== null &&
    'id' in v &&
    typeof (v as any).id === 'number' &&
    'name' in v &&
    typeof (v as any).name === 'string'
  );
}

const data = JSON.parse('{"id": 1, "name": "A"}') as unknown;
if (isUser(data)) {
  console.log(data.name); // Safe & typed
}
```

## 7. as const Assertions (`07_as_consts.ts`)

- Appending as const creates deeply readonly structures with literal types instead of widened types.

- Derive Union Types from Arrays:

```ts
const ROLES = ["admin", "user", "operator"] as const;

// Equivalent to: type Role = "admin" | "user" | "operator"
type Role = (typeof ROLES)[number];
```

## 8. Unions & Narrowing (`08_unions.ts`)

- Discriminated Unions

- Use a common literal property (e.g., role) to discriminate between union members:

```ts
type Admin = { role: 'Admin'; permissions: string[] };
type Customer = { role: 'Customer'; loyaltyPoints: number };

function describeUser(u: Admin | Customer) {
  if (u.role === 'Admin') {
    console.log(u.permissions);
  } else {
    console.log(u.loyaltyPoints);
  }
}
```

- in Operator Narrowing: Checks property presence ('permissions' in u).

## Union of Arrays vs. Array of Unions

- Array of Unions (`(string | number)[]`): A single array holding mixed elements: `["a", 1, "b", 2]`.

- Union of Arrays (`string[] | number[]`): The variable is either entirely an array of strings OR entirely an array of numbers. Direct mutating calls like .push() on mixed inputs fail because the specific array type is unresolved.
