# TypeScript Intermediate Types & Functions — Revision Guide

* A reference guide covering intersections, advanced array structures, tuples, and function signatures based on modules 09 through 14.

---

## Table of Contents

- [1. Intersection Types (`09_intersection.ts`)](#1-intersection-types-09_intersectionts)
- [2. Array Fundamentals (`010_arrays_basics.ts`)](#2-array-fundamentals-010_arrays_basicsts)
- [3. Readonly Arrays (`011_readonly_arrays.ts`)](#3-readonly-arrays-011_readonly_arraysts)
- [4. Tuples (`012_tuples.ts`)](#4-tuples-012_tuplests)
- [5. Parameter Annotations & Contextual Typing (`013_params_annotations.ts`)](#5-parameter-annotations--contextual-typing-013_params_annotationsts)
- [6. Optional & Default Parameters (`014_optional_default.ts`)](#6-optional--default-parameters-014_optional_defaultts)

---

## 1. Intersection Types (`09_intersection.ts`)

Intersection types (`&`) combine multiple types into one. A value typed as an intersection must satisfy **every** combined type simultaneously.

### Object Composition

```ts
type Inter1 = { id: string };
type Inter2 = { createdAt: Date };

// Entity requires both `id` and `createdAt`
type Entity = Inter1 & Inter2;

const e: Entity = { id: "e1", createdAt: new Date() };

type Product = { id: string; title: string };
type Priced = { price: number };

type PricedProduct = Product & Priced;
```

### Impossible Intersections

If intersecting types share a property key with conflicting primitive types, that property resolves to never:

```ts
type NumberHolder = { a: number };
type StringHolder = { a: string };

type Conflict = NumberHolder & StringHolder; 
// property 'a' becomes: number & string = never (cannot be instantiated)
```

## 2. Array Fundamentals (`010_arrays_basics.ts`)

Arrays can be declared with square-bracket syntax or generic generic wrapper syntax.

| Syntax | Example | Description |
| :--- | :--- | :--- |
| `T[]` | `number[]` | Standard compact array syntax |
| `Array<T>` | `Array<number>` | Generic array syntax (identical behavior) |
| `(A \| B)[]` | `(string \| number)[]` | Array of mixed values containing either string or number |

```ts
const a1: number[] = [1, 2, 3];
const a2: Array<number> = [1, 2, 3];
const mix: (string | number)[] = [1, "2", 3, "4", 5];
```

## 3. Readonly Arrays (011_readonly_arrays.ts)

* `readonly T[]` and ReadonlyArray`<T>` prevent mutation methods `(push, pop, index assignment)`.

* Subtyping Rule: A standard mutable array is assignable to a readonly parameter, but a readonly array cannot be passed to a function expecting a mutable array.

* Non-mutating methods: Methods that return new arrays (e.g., .map(), .filter(), .slice()) remain valid on readonly arrays.

```ts
const mutableList = [1, 2, 3, 4, 5];
const readonlyList: readonly number[] = [1, 2, 3];

// readonlyList[0] = 9;  // Error: Index signature in type 'readonly number[]' only permits reading.
// readonlyList.push(3); // Error: Property 'push' does not exist on type 'readonly number[]'.

function sum(nums: readonly number[]): number {
  let s = 0;
  for (const n of nums) s += n;
  return s;
}

sum(mutableList); // Valid: mutable satisfies readonly requirement
```

## 4. Tuples (`012_tuples.ts`)

Tuples are arrays with a fixed number of elements where each position has a specific type.

Standard, Optional, and Readonly Tuples

* Standard: [string, number] specifies exactly two elements.

* Labeled & Optional: Labels (e.g., status: number) improve readability; ? marks optional trailing items.

* Readonly Tuple: Prevents reassigning values at specific indices or using .push().

```ts
// Fixed: exactly [string, number]
const userEntry: [string, number] = ["Kapil", 29];

// Optional element tuple (length can be 1 or 2)
type ResponseRow = [status: number, message?: string];
const r1: ResponseRow = [200];
const r2: ResponseRow = [404, "Not Found"];

// Readonly tuple
const corners: readonly [number, number] = [0, 1];
// corners[0] = 5; // Error: Cannot assign to '0' because it is a read-only property.
```

## 5. Parameter Annotations & Contextual Typing (`013_params_annotations.ts`)

* Explicit Annotations: Always annotate standard function parameters, as TypeScript cannot infer them from the function body alone.

* Structured Parameters: Use type aliases or interfaces for complex parameter objects.

```ts
// Callback inference (n is automatically typed as number)
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);

// Object parameter typing
type Point = { x: number; y: number };

function distanceFromOrigin(p: Point): number {
  return Math.hypot(p.x, p.y);
}
```

## 6. Optional & Default Parameters (`014_optional_default.ts`)

* Optional (?) vs. Default (=)

* Optional parameters (name?: string) become string | undefined.

* Default parameters (name: string = "Guest") allow omitting the argument while guaranteeing the variable has a concrete fallback inside the function body.

```ts
// Optional parameter
function greetPersonOptional(name?: string): string {
  const upperRes = name ? name.toUpperCase() : "Guest";
  return `Hello ${upperRes}`;
}

// Default parameter
function greetPersonDefault(name: string = "Guest"): string {
  return `Hello ${name.toUpperCase()}`;
}
```

* Ordering & Fallbacks

* Optional and default parameters must be placed after all required parameters.

* Use Nullish Coalescing (??) to handle undefined without unintentionally catching falsy values like 0 or "".

```ts
function connect(host: string, port?: number, secure?: boolean) {
  const p = port ?? 80;
  const s = secure ?? false;
  return `Connect ${host}:${p} (secure: ${s})`;
}
```

