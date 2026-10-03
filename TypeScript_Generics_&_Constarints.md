# TypeScript Generics & Constraints — Revision Guide

- A reference guide covering generic type parameters, inference vs. explicit declaration, and shape constraints using `extends` and `keyof` based on modules 023 and 024.

---

## Table of Contents

- [1. Core Concept: What is a Generic?](#1-core-concept-what-is-a-generic)
- [2. Generic Functions & Inference (`023_generics_intro.ts`)](#2-generic-functions--inference-023_generics_introts)
  - [The Identity Function (`id<T>`)](#the-identity-function-idt)
  - [Generics with Collections (`firstGen<T>`)](#generics-with-collections-firstgent)
  - [Generic Return Shapes (`wrap<T>`)](#generic-return-shapes-wrapt)
- [3. Generic Constraints (`024_generics_constraints.ts`)](#3-generic-constraints-024_generics_constraintsts)
  - [Structural Constraints (`T extends Shape`)](#structural-constraints-t-extends-shape)
  - [Key-Lookup Constraints (`K extends keyof T`)](#key-lookup-constraints-k-extends-keyof-t)
- [4. Quick Comparison: `any` vs `unknown` vs Generics](#4-quick-comparison-any-vs-unknown-vs-generics)

---

## 1. Core Concept: What is a Generic?

> **Definition:** A **generic** acts like a variable for types. It lets you write reusable functions, interfaces, or classes that work with multiple types while **preserving the exact type information** across inputs and outputs.

* `<T>` is a placeholder type parameter.
* TypeScript usually detects the type of `T` automatically (**type inference**).
* You can explicitly supply the type parameter if needed: `func<string>(...)`.

---

## 2. Generic Functions & Inference (`023_generics_intro.ts`)

### The Identity Function (`id<T>`)

Passing an argument into `id<T>` causes `T` to lock onto that specific argument type, guaranteeing the exact return type:

```ts
function id<T>(x: T): T {
  return x;
}

// Inferred usage:
const num = id(5);          // T is inferred as number -> return is number
const str = id('kapil');    // T is inferred as string -> return is string
const arr = id(['a', 'b']); // T is inferred as string[]

// Explicit type parameter passing:
const explicit = id<number>(5);
```

### Generics with Collections (`firstGen<T>`)

- Using T[] specifies that the argument must be an array of T, and the returned value will be an element of type T (or undefined if empty):

```ts
function firstGen<T>(arr: T[]): T | undefined {
  return arr[0];
}

const firstNumber = firstGen([1, 2, 3]); // Return type: number | undefined
const firstName = firstGen(['a', 'b']);  // Return type: string | undefined
```

### Generic Return Shapes (`wrap<T>`)

- Generics can be embedded inside object returns to wrap values without discarding their original types:

```ts
function wrap<T>(value: T): { value: T } {
  return { value };
}

const wrappedNum = wrap(42);
// Inferred shape: { value: number } -> wrappedNum.value + 1 is valid

const wrappedUser = wrap({ name: 'Kapil', role: 'Admin' as const });
// Inferred shape: { value: { name: string; role: "Admin" } }
```

## 3. Generic Constraints (`024_generics_constraints.ts`)

- By default, `<T>` allows any value. A generic constraint `(T extends TargetShape)` restricts `T` so only types matching that minimum structure are permitted.

### Structural Constraints (`T extends Shape`)

- Restricts arguments to types that contain a required set of properties:

```ts
// T can be anything as long as it has a numeric length property
function len<T extends length: number { }>(item: T): number {
  return item.length;
}

len('hello');            // OK: strings have .length
len([1, 2, 3]);          // OK: arrays have .length
len({ length: 10 });     // OK: custom object matches structure

// len(123); 
// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'
```

### Key-Lookup Constraints (`K extends keyof T`)

- Ensures a parameter `K`is guaranteed to be a valid key of object type `T`. Using indexed access `T[K]` ensures the returned array matches the property's exact type:

```ts
function extractProperty<T, K T extends keyof>(arr: T[], key: K): Array<T[K]> {
  return arr.map((item) => item[key]);
}

type User = { id: string; name: string; age?: number };

const users: User[] = [
  { id: '1', name: 'Kapil', age: 34 },
  { id: '2', name: 'John' },
];

const ids = extractProperty(users, 'id');     // string[]
const names = extractProperty(users, 'name'); // string[]
const ages = extractProperty(users, 'age');   // (number | undefined)[]

// extractProperty(users, 'email');
// Error: Argument of type '"email"' is not assignable to parameter of type 'keyof User'.
```

## 4. Quick Comparison: `any` vs `unknown` vs Generics

| Approach | Type Safety | Type Preservation | Example Signature |
| :--- | :--- | :--- | :--- |
| **`any`** | None (disables type checking) | Lost | `(x: any) => any` |
| **`unknown`** | High (forces narrowing checks) | Lost (returns `unknown`) | `(x: unknown) => unknown` |
| **Generic (`<T>`)** | Complete (validated at compile time) | **Preserved** (output matches input type) | `<T>(x: T) => T` |