# TypeScript Advanced Functions & Rest Tuples — Revision Guide

A reference guide covering rest parameters, rest tuple validation, spread typing nuances, return type conventions, and async inference based on `015_rest_tuples.ts`.

---

## Table of Contents

- [1. Rest Parameters with Arrays](#1-rest-parameters-with-arrays)
- [2. Rest Parameters with Tuples](#2-rest-parameters-with-tuples)
- [3. Spreading Arguments: Plain Arrays vs. `as const` Tuples](#3-spreading-arguments-plain-arrays-vs-as-const-tuples)
- [4. Return Type Annotations vs. Inference](#4-return-type-annotations-vs-inference)
- [5. Async Function Return Inference](#5-async-function-return-inference)

---

## 1. Rest Parameters with Arrays

- Use the rest operator (`...xs: T[]`) to accept an arbitrary number of arguments into a typed array:

```ts
function sumAllNumbers(...xs: number[]): number {
  return xs.reduce((s, n) => s + n, 0);
}

sumAllNumbers(1, 2, 3, 4, 5); // 15
```

## 2. Rest Parameters with Tuples

- Instead of a plain array, you can type rest parameters as a named tuple. This enforces strict argument counts and positions at compile time while allowing optional flags:

```ts
function makeRange(...args: [start: number, end: number, step?: number]): number[] {
  const [start, end, step = 1] = args;
  const out: number[] = [];

  for (let n = start; n <= end; n += step) {
    out.push(n);
  }
  return out;
}

makeRange(1, 5);       // Valid: [1, 2, 3, 4, 5]
makeRange(2, 10, 2);   // Valid: [2, 4, 6, 8, 10]
// makeRange(1);       // Error: Expected at least 2 arguments, but got 1.
```

## 3. Spreading Arguments: Plain Arrays vs. as const Tuples

- When passing arguments via the spread operator (...) to a function expecting fixed positional parameters:

- Mutable Array: Inferred as `number[]` (variable length). TypeScript rejects spreading it into fixed parameters because length cannot be guaranteed.

- `as const` Tuple: Narrowed to `readonly [number, number]` (fixed length). TypeScript safely accepts the spread.

```ts
function draw(x: number, y: number) {
  console.log(x, y);
}

const points = [10, 20];
// draw(...points); 
// Error: A spread argument must either have a tuple type or be passed to a rest parameter.

const pointsFixed = [10, 20] as const; // readonly [10, 20]
draw(...pointsFixed); // OK
```

## 4. Return Type Annotations vs. Inference

| Scenario | Pattern | Best Practice |
| :--- | :--- | :--- |
| **Small internal helpers** | `const doubleFunc = (n: number) => n * 2` | Rely on TS inference to keep code lean |
| **Exported / public APIs** | `export function toTitle(s: string): string` | Explicitly annotate to prevent unintended contract changes |
| **Multi-branch functions** | `function booleanToNumbers(flag: boolean): number` | Explicitly annotate to catch mismatched branch returns early |


```ts
export function toTitle(s: string): string {
  return `Hello ${s}`;
}

function booleanToNumbers(flag: boolean): number {
  if (flag) {
    return 1;
  } else {
    return 0;
  }
}
```

## 5. Async Function Return Inference

- Async functions always return a Promise. TypeScript automatically wraps inferred return types into `Promise<T>:`

```ts
// Return type is automatically inferred as Promise<number>
async function loadCountInferred() {
  return 42;
}

loadCountInferred().then(n => console.log(n)); // n is inferred as number
```

### Explicit async return type

An async function's return type should be written as `Promise<T>`, not simply `T`.

```ts
async function getNumber(): Promise<number> {
  return 42;
}
