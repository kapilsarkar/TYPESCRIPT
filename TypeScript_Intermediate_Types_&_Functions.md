# TypeScript Intermediate Types & Functions — Revision Guide

A short cheat sheet for modules **09 and 010–014** in `src/` (intersections, arrays, tuples, and function parameters). Each section: **plain definition**, then a **small example** tied to the lesson file.

**Run a lesson file:**

```powershell
npm run build
node dist/09_intersections.js   # change the name to match the file
```

---

## Table of Contents

- [1. Intersection Types (`09_intersections.ts`)](#1-intersection-types-09_intersectionsts)
- [2. Array Fundamentals (`010_arrays_basics.ts`)](#2-array-fundamentals-010_arrays_basicsts)
- [3. Readonly Arrays (`011_readonly_arrays.ts`)](#3-readonly-arrays-011_readonly_arraysts)
- [4. Tuples (`012_tuples.ts`)](#4-tuples-012_tuplests)
- [5. Parameter Annotations & Contextual Typing (`013_params_annotations.ts`)](#5-parameter-annotations--contextual-typing-013_params_annotationsts)
- [6. Optional & Default Parameters (`014_optional_default.ts`)](#6-optional--default-parameters-014_optional_defaultts)

---

## 1. Intersection Types (`09_intersections.ts`)

**Definition:** `A & B` means “must be **all of A and all of B** at once.” You get **every property** from both sides on one value.

**Compare to union (`|`):** `A | B` = either A **or** B. `A & B` = A **and** B together.

### Object composition

```ts
type Inter1 = { id: string }
type Inter2 = { createdAt: Date }

type Entity = Inter1 & Inter2 // needs id AND createdAt

const e: Entity = { id: 'e1', createdAt: new Date() }

type Product = { id: string; title: string }
type Priced = { price: number }

type PricedProduct = Product & Priced
// { id, title, price }
```

### Impossible intersections

**Definition:** If the **same property name** needs two incompatible types, that property becomes `never` — you cannot build a real value.

```ts
type NumberHolder = { a: number }
type StringHolder = { a: string }

type Conflict = NumberHolder & StringHolder
// a is number & string → never

// const bad: Conflict = { a: 123 } // Error
```

---

## 2. Array Fundamentals (`010_arrays_basics.ts`)

**Definition:** An array is a list of values of one type (or a union of allowed element types). Two syntaxes; same meaning.

| Syntax | Example | Meaning |
|--------|---------|---------|
| `T[]` | `number[]` | Array of numbers |
| `Array<T>` | `Array<number>` | Same as `number[]` |
| `(A \| B)[]` | `(string \| number)[]` | One array; each item is string **or** number |

```ts
const a1: number[] = [1, 2, 3]
const a2: Array<number> = [1, 2, 3]
const mix: (string | number)[] = [1, '2', 3, '4', 5]

// mix.push(true) // Error: boolean not allowed in this array type
```

**Not the same as:** `string[] | number[]` (whole array is either all strings or all numbers — see Core Fundamentals §8).

---

## 3. Readonly Arrays (`011_readonly_arrays.ts`)

**Definition:** A readonly array can be **read** (loop, `map`, `slice`) but not **mutated** (`push`, `pop`, `arr[i] = …`).

| Syntax | Same as |
|--------|---------|
| `readonly number[]` | `ReadonlyArray<number>` |

**Subtyping rule (simple):**

- Mutable array → readonly parameter: **OK** (you promise not to mutate inside the function).
- Readonly array → mutable parameter: **Error** (caller might mutate; readonly cannot guarantee that).

```ts
const mutableList = [1, 2, 3, 4, 5]
const readonlyList: readonly number[] = [1, 2, 3]

// readonlyList[0] = 9   // Error
// readonlyList.push(3)  // Error

function sum(nums: readonly number[]): number {
  let s = 0
  for (const n of nums) s += n
  return s
}

sum(mutableList) // OK
sum(readonlyList) // OK

const doubled = readonlyList.map(n => n * 2) // OK: returns a new array
```

---

## 4. Tuples (`012_tuples.ts`)

**Definition:** A tuple is an array with a **fixed length** and a **specific type per index** (order matters).

| Kind | Example | Length |
|------|---------|--------|
| Standard | `[string, number]` | Exactly 2 |
| Labeled | `[status: number, message?: string]` | Readable names; `?` = optional tail |
| Readonly tuple | `readonly [number, number]` | Fixed; indices cannot be reassigned |

```ts
const userEntry: [string, number] = ['Kapil', 29]
// userEntry = ['Kapil']        // Error: too short
// userEntry = ['Kapil', 29, 1] // Error: too long

type ResponseRow = [status: number, message?: string]
const r1: ResponseRow = [200]
const r2: ResponseRow = [404, 'Not Found']

const corners: readonly [number, number] = [0, 1]
// corners[0] = 5 // Error
```

**Remember:** `[string, number]` is not the same as `(string | number)[]` — the tuple enforces position and length.

---

## 5. Parameter Annotations & Contextual Typing (`013_params_annotations.ts`)

**Definition:**

- **Parameter annotation:** You write the type on the parameter (`p: Point`) because TS does not infer parameter types from the function body alone.
- **Contextual typing:** TS uses the **expected type** (e.g. callback parameter of `.map`) to type a parameter without you writing it.

```ts
// Contextual typing: nums is number[], so n is number
const nums = [1, 2, 3]
const doubled = nums.map(n => n * 2)

// Explicit annotation on a normal function parameter
type Point = { x: number; y: number }

function distanceFromOrigin(p: Point): number {
  return Math.hypot(p.x, p.y)
}

distanceFromOrigin({ x: 3, y: 4 }) // OK
// distanceFromOrigin({ x: 3 })   // Error: missing y
```

**Tip:** For big argument objects, use a `type` or `interface` instead of inline `{ ... }` on every function.

---

## 6. Optional & Default Parameters (`014_optional_default.ts`)

**Definition:**

| Feature | Syntax | Type inside function | If caller omits argument |
|---------|--------|----------------------|---------------------------|
| **Optional** | `name?: string` | `string \| undefined` | `undefined` |
| **Default** | `name = 'Guest'` | `string` | default value is used |

**Order:** Required parameters first; optional and defaulted parameters after.

```ts
function greetOptional(name?: string): string {
  const label = name ? name.toUpperCase() : 'GUEST'
  return `Hello ${label}`
}

function greetDefault(name: string = 'Guest'): string {
  return `Hello ${name.toUpperCase()}` // safe: name is always string
}

greetOptional() // Hello GUEST
greetDefault()  // Hello Guest
```

**Defaults inside the body:** Use **`??`** when you only want to replace `null` / `undefined`, not other falsy values like `0` or `""`.

```ts
function connect(host: string, port?: number, secure?: boolean) {
  const p = port ?? 80 // if port is 0, keep 0 (not replaced by 80)
  const s = secure ?? false
  return `Connect ${host}:${p} (secure: ${s})`
}

connect('localhost')           // port 80, secure false
connect('localhost', 0)        // port 0 (?? keeps 0)
connect('localhost', undefined, true)
```

**Optional vs default (quick pick):**

- Use **`?`** when “missing” should mean `undefined` and you handle it yourself.
- Use **`= value`** when omitting the argument should always behave like a real value (e.g. `'Guest'`).

---

## Quick map: file → idea

| File | One-line takeaway |
|------|-------------------|
| `09_intersections.ts` | `&` merges shapes; value must satisfy all |
| `010_arrays_basics.ts` | `T[]` / `Array<T>`; mixed elements use `(A \| B)[]` |
| `011_readonly_arrays.ts` | Read-only lists; mutable can go where readonly is expected |
| `012_tuples.ts` | Fixed length and types per index |
| `013_params_annotations.ts` | Annotate params; callbacks often infer |
| `014_optional_default.ts` | `?` vs `=`; required params first; `??` for defaults |

**Next in the curriculum:** rest parameters, return types, and more — see `Typescript_Advanced_Functions_&_Rest_Tuples.md` (modules 015–016+).
