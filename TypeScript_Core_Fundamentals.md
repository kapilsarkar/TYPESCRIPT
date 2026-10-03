# TypeScript Core Fundamentals — Revision Guide

A short cheat sheet for modules **01–08** in `src/`. Each section: **what it means in plain words**, then a **tiny example** you can match to the matching `.ts` file.

**Run a lesson file:**

```powershell
npm run build
node dist/01_inference.js   # change the number to match the file
```

---

## Table of Contents

- [1. Type Inference & Annotations (`01_inference.ts`)](#1-type-inference--annotations-01_inferencets)
- [2. Primitives & Symbols (`02_primitive.ts`)](#2-primitives--symbols-02_primitivets)
- [3. Special Types (`03_special.ts`)](#3-special-types-03_specialts)
- [4. Object Types & Index Signatures (`04_objects.ts`)](#4-object-types--index-signatures-04_objectsts)
- [5. Literal Types & Widening (`05_literals.ts`)](#5-literal-types--widening-05_literalsts)
- [6. Type Assertions & Custom Type Guards (`06_assertions.ts`)](#6-type-assertions--custom-type-guards-06_assertionsts)
- [7. `as const` Assertions (`07_as_const.ts`)](#7-as-const-assertions-07_as_constts)
- [8. Unions & Narrowing (`08_unions.ts`)](#8-unions--narrowing-08_unionsts)
  - [Discriminated unions](#discriminated-unions)
  - [Union of arrays vs array of unions](#union-of-arrays-vs-array-of-unions)

---

## 1. Type Inference & Annotations (`01_inference.ts`)

**Definition:** TypeScript guesses types from your code (*inference*). You add types (*annotations*) when TS cannot guess or when you want a wider/narrower type on purpose.

**`let` vs `const`:**

| Code | What TS thinks | Why |
|------|----------------|-----|
| `let count = 0` | `number` | `let` can change → type is the general kind |
| `const site = "accedevhub"` | `"accedevhub"` | `const` cannot change → type can stay the exact value |

**When to write types yourself:**

- Function parameters and return types (TS often cannot infer parameters from nowhere).
- Variables declared now and assigned later: `let id: string;`
- When one variable can be more than one shape: `let maybe: string | number`

**Tip:** Do not annotate every primitive; annotate where it helps readability or fixes an error.

```ts
export function add(a: number, b: number): number {
  return a + b
}

let total = add(2, 3) // total is inferred as number
```

---

## 2. Primitives & Symbols (`02_primitive.ts`)

**Definition:** The built-in value kinds JavaScript already has. TypeScript tracks them so you do not treat a string like a number by mistake.

| Type | Example | Notes |
|------|---------|--------|
| `string` | `"hello"` | Text |
| `number` | `42`, `3.14` | Includes `NaN`; not the same as `bigint` |
| `boolean` | `true` / `false` | |
| `bigint` | `10n` | For very large integers |
| `symbol` | `Symbol('id')` | Often used as unique keys |
| `undefined` / `null` | | With `strictNullChecks`, not assignable unless allowed |

**BigInt vs number:** You cannot do `10n + 5` without converting one side.

**`unique symbol`:** Every `Symbol('TOKEN')` is different; `unique symbol` marks a symbol meant to be one-of-a-kind in the type system.

```ts
const big: bigint = 2n ** 63n - 1n
const age: number = 34
// const bad = big + age // Error: mix bigint and number

const TOKEN: unique symbol = Symbol('TOKEN')
```

---

## 3. Special Types (`03_special.ts`)

**Definition:** Types that describe “no useful value,” “impossible,” or “anything / unknown input.”

| Type | Plain meaning | Typical use |
|------|----------------|-------------|
| `void` | Function returns nothing useful | `function log(msg: string): void { console.log(msg) }` |
| `never` | This code path never finishes normally | `throw`, infinite loop, exhaustive `switch` |
| `any` | Turn off checking for that value | Avoid in app code |
| `unknown` | “Something from outside”; safe `any` | API/JSON — narrow before use |

**Strict null checks:** A `string` variable cannot hold `null` or `undefined` unless you allow it: `string | undefined`.

```ts
function parse(input: unknown) {
  if (typeof input === 'string') {
    return input.toUpperCase() // OK: narrowed to string
  }
  return 'not a string'
}
```

---

## 4. Object Types & Index Signatures (`04_objects.ts`)

**Definition:** Describe the shape of objects — which keys exist, which are optional, and which cannot change.

- **`readonly`:** After creation, you cannot reassign that property.
- **Optional `?`:** Key may be **missing**.
- **`prop: T | undefined`:** Key must **exist**, value may be `undefined`.

```ts
type User = {
  id: number
  name: string
  email?: string // may omit the key
  readonly createdAt: Date
}
```

**Dynamic keys:**

- **Index signature:** any string key → same value type  
  `type Scores = { [key: string]: number }`
- **`Record`:** fixed set of keys → value type  
  `type Count = Record<'likes' | 'views', number>`

---

## 5. Literal Types & Widening (`05_literals.ts`)

**Definition:** A literal type is one exact value (e.g. `"left"`), not all strings. **Widening** is when TS generalizes a value (e.g. `"left"` → `string`) because the variable could change.

```ts
type Direction = 'left' | 'right' | 'up'

const d1 = 'left' // type: "left" (const → stays literal)
let d2 = 'left' // type: string (let → widened)
let d3: Direction = 'left' // OK: you promised Direction
// let d4: Direction = d2 // Error: string is not always a Direction
```

**Remember:** `const` keeps literals; `let` often widens unless you annotate.

---

## 6. Type Assertions & Custom Type Guards (`06_assertions.ts`)

**Definition:**

- **`as Type` (assertion):** You tell the compiler the type. **Runtime is unchanged** — wrong assertions can still crash.
- **`v is Type` (type guard):** A function that returns `boolean` but **also teaches TS** that inside `if (guard(v))`, `v` is that type.

```ts
type User = { id: number; name: string }

function isUser(v: unknown): v is User {
  return (
    typeof v === 'object' &&
    v !== null &&
    'id' in v &&
    typeof (v as User).id === 'number' &&
    'name' in v &&
    typeof (v as User).name === 'string'
  )
}

const data: unknown = JSON.parse('{"id": 1, "name": "A"}')
if (isUser(data)) {
  console.log(data.name) // User — no assertion needed here
}
```

**Prefer guards** for unknown data; use `as` sparingly when you know more than TS (e.g. DOM APIs).

---

## 7. `as const` Assertions (`07_as_const.ts`)

**Definition:** `as const` freezes a value: properties become `readonly`, and strings/numbers become **literal types** instead of `string` / `number`.

```ts
const ROLES = ['admin', 'user', 'operator'] as const
// typeof ROLES → readonly ["admin", "user", "operator"]

type Role = (typeof ROLES)[number]
// same as: "admin" | "user" | "operator"

const config = { theme: 'dark', version: 1 } as const
// config.theme is "dark", not string
```

**Use when:** You want a fixed list of allowed strings/numbers and types derived from that list.

---

## 8. Unions & Narrowing (`08_unions.ts`)

**Definition:** A **union** `A | B` means “either A or B.” **Narrowing** is how TS learns which one you have (`if`, `switch`, `typeof`, `in`, etc.) so you can use the right fields safely.

### Discriminated unions

**Definition:** Each union member shares one field (the *discriminant*) with a **unique literal** value, so `if (u.role === 'Admin')` narrows the whole object.

```ts
type Admin = { role: 'Admin'; permissions: string[] }
type Customer = { role: 'Customer'; loyaltyPoints: number }

function describeUser(u: Admin | Customer) {
  if (u.role === 'Admin') {
    console.log(u.permissions)
  } else {
    console.log(u.loyaltyPoints)
  }
}
```

### `in` operator narrowing

**Definition:** `'permissions' in u` checks if a property exists at runtime; TS uses that to pick the matching union member (useful when there is no single `role` field).

```ts
type WithPerms = { permissions: string[] }
type WithPoints = { loyaltyPoints: number }

function info(u: WithPerms | WithPoints) {
  if ('permissions' in u) {
    return u.permissions.join(',')
  }
  return u.loyaltyPoints
}
```

### Union of arrays vs array of unions

| Type | Meaning | Example |
|------|---------|---------|
| `(string \| number)[]` | **One array**, mixed items OK | `['a', 1, 'b']` |
| `string[] \| number[]` | **Either** all strings **or** all numbers | `['a','b']` or `[1,2]` — not mixed |

```ts
const mixed: (string | number)[] = ['a', 1]
mixed.push(2) // OK

let either: string[] | number[] = ['a', 'b']
// either.push(1) // Error: not sure which array type you have
```

---

## Quick map: file → idea

| File | One-line takeaway |
|------|-------------------|
| `01_inference.ts` | TS guesses types; annotate when needed |
| `02_primitive.ts` | string, number, boolean, bigint, symbol |
| `03_special.ts` | void, never, any, unknown |
| `04_objects.ts` | object shapes, optional, readonly, index signatures |
| `05_literals.ts` | exact values vs widening with `let` |
| `06_assertions.ts` | `as` vs `is` guards |
| `07_as_const.ts` | freeze values; derive union types |
| `08_unions.ts` | `A \| B`, narrow with if / discriminant / `in` |

For later modules (functions, generics, etc.), see the other revision guides in this folder.
