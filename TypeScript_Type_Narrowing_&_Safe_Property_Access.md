# TypeScript Type Narrowing & Safe Property Access — Revision Guide

A reference guide covering runtime type inspection (`typeof`, `instanceof`, `Array.isArray`), property presence narrowing (`in`), optional chaining (`?.`), and fallbacks (`??` vs `||`) based on modules 021 and 022.

---

## Table of Contents

- [1. Runtime Type Narrowing (`021_typeof.ts`)](#1-runtime-type-narrowing-021_typeofts)
  - [The `typeof` Guard](#the-typeof-guard)
  - [Narrowing Complex Types (`instanceof` & `Array.isArray`)](#narrowing-complex-types-instanceof--arrayisarray)
- [2. The `in` Operator Guard (`022_in_optional_nullish.ts`)](#2-the-in-operator-guard-022_in_optional_nullishts)
- [3. Safe Property Access & Fallbacks (`022_in_optional_nullish.ts`)](#3-safe-property-access--fallbacks-022_in_optional_nullishts)
  - [Optional Chaining (`?.`)](#optional-chaining-)
  - [Nullish Coalescing (`??`) vs. Logical OR (`\|\|`)](#nullish-coalescing--vs-logical-or-)

---

## 1. Runtime Type Narrowing (`021_typeof.ts`)

### The `typeof` Guard

TypeScript understands JavaScript's runtime `typeof` operator to narrow union and `unknown` types inside conditional branches.

> **Caution:** In JavaScript, `typeof null === 'object'`. Always check for `null` explicitly when narrowing generic objects.

```ts
function describeTypeOf(x: unknown): string {
  if (typeof x === 'string') return 'string';
  if (typeof x === 'number') return 'number';
  if (typeof x === 'boolean') return 'boolean';
  if (typeof x === 'bigint') return 'bigint';
  if (typeof x === 'symbol') return 'symbol';
  if (typeof x === 'undefined') return 'undefined';
  if (typeof x === 'function') return 'function';

  // Handle JavaScript quirk: typeof null === 'object'
  if (x === null) return 'null';

  return 'object';
}
```

### Narrowing Complex Types (`instanceof & Array.isArray`)

- Because typeof returns "object" for arrays, dates, errors, and plain objects, use specialized runtime checks to narrow specific prototypes:

| Check | Target Narrowing |
| :--- | :--- |
| `Array.isArray(val)` | Narrows `unknown` to `any[]` / specific array types |
| `val instanceof Date` | Narrows to prototype `Date` |
| `val instanceof Error` | Narrows to prototype `Error` (enables access to `.message`, `.stack`) |

```ts
function info(z: unknown) {
  if (Array.isArray(z)) {
    return { kind: 'array' as const, value: z };
  }

  if (z instanceof Date) {
    return { kind: 'date' as const, value: z };
  }

  if (z instanceof Error) {
    return { kind: 'error' as const, value: z };
  }

  return { kind: 'other' as const, value: z };
}
```

## 2. The in Operator Guard (`022_in_optional_nullish.ts`)

- The 'prop' in object check verifies whether a property key exists on an object at runtime and narrows union branches where only certain members declare that property.

```ts
type Admin = { role: 'Admin'; permissions: string[] };
type User = { role: 'User'; expiresAt: Date };

type Account = Admin | User;

function describeAccount(u: Account): string {
  if ('permissions' in u) {
    // TypeScript knows u is Admin here
    return `Admin: ${u.permissions.join(', ')}`;
  }

  // TypeScript narrows u to User here
  return `User expires: ${u.expiresAt.toISOString()}`;
}
```

### 3. Safe Property Access & Fallbacks (022_in_optional_nullish.ts)

- Optional Chaining (?.)

- Stops evaluation and short-circuits to undefined if the reference before ?. is null or undefined, preventing TypeError: Cannot read properties of undefined crashes.

```ts
type Profile = {
  name: string;
  contact?: { email?: string };
};

const userA: Profile = { name: 'John' };
const userB: Profile = { name: 'Ben', contact: { email: 'ben123@gmail.com' } };

const emailA = userA.contact?.email; // undefined (safe, no throw)
const emailB = userB.contact?.email; // "ben123@gmail.com"
```

| Operator | Left Operand Condition to Trigger Fallback | Falsy Values Retained (`0`, `""`, `false`) |
| :--- | :--- | :--- |
| **`??` (Nullish)** | Only `null` or `undefined` | **Preserved** (valid data is kept) |
| **`\|\|` (Logical OR)** | Any falsy value (`0`, `""`, `false`, `null`, `undefined`, `NaN`) | **Replaced** by right operand |

```ts
const countFromServer: number | null = 0;
const labelFromServer: string | undefined = '';

// ?? preserves valid falsy data
const countFixed = countFromServer ?? 100; // 0
const labelFixed = labelFromServer ?? 'unknown'; // ''

// || overwrites valid falsy data
const countFallback = countFromServer || 100; // 100 (0 treated as absent)
const labelFallback = labelFromServer || 'unknown'; // 'unknown' ("" treated as absent)
```
