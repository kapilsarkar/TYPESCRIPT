# TypeScript Interfaces, Type Aliases & Dictionaries — Revision Guide

A reference guide covering interfaces, inheritance, type aliases, declaration merging, and dynamic index signatures based on modules 017 through 020.

---

## Table of Contents

- [1. Interface Fundamentals & Inheritance (`017_interfaces_basics.ts`)](#1-interface-fundamentals--inheritance-017_interfaces_basicsts)
- [2. Type Aliases & Compositions (`018_type_aliases.ts`)](#2-type-aliases--compositions-018_type_aliasests)
- [3. Interfaces vs. Type Aliases (`019_interfaces_vs_types.ts`)](#3-interfaces-vs-type-aliases-019_interfaces_vs_typests)
- [4. Index Signatures & Record Types (`020_index_signatures.ts`)](#4-index-signatures--record-types-020_index_signaturests)

---

## 1. Interface Fundamentals & Inheritance (`017_interfaces_basics.ts`)

An `interface` defines a named contract for an object's structure. It supports optional properties (`?`), read-only fields (`readonly`), and object inheritance via `extends`.

### Single and Multiple Inheritance

An interface can extend one or more interfaces to assemble larger contracts:

```ts
interface User {
  id: number;
  name: string;
  email?: string;
  readonly createdAt: Date;
}

// Single inheritance
interface Admin extends User {
  permissions: string[];
}

interface WithMeta {
  meta: {
    active: boolean;
  };
}

// Multiple inheritance
interface AdminWithMeta extends Admin, WithMeta {}

const adminAccount: AdminWithMeta = {
  id: 2,
  name: "Kapil",
  createdAt: new Date(),
  email: "xyz@gmail.com",
  permissions: ["admin"],
  meta: {
    active: true,
  },
};
```

## 2. Type Aliases & Compositions (`018_type_aliases.ts`)

- A type alias assigns a name to any valid type: object shapes, primitives, union types, or intersection types.

```ts
// Object shape
type Person = {
  id: string;
  address: string;
  salary: number;
};

// Union type (discrete literal options)
type Status = "new" | "paid" | "pending";

function nextActionCheck(s: Status): string {
  switch (s) {
    case "new":
      return "new";
    case "paid":
      return "paid";
    case "pending":
      return "pending";
    default:
      return "default";
  }
}

// Intersection composition (&)
type ToMerge1 = { price: number };
type ToMerge2 = { stock: number };

type MergedProductInfo = Person & ToMerge1 & ToMerge2;
```

## 3. Interfaces vs. Type Aliases (`019_interfaces_vs_types.ts`)

- Both model object shapes, but their capabilities differ fundamentally:

| Feature | `interface` | `type` Alias |
| :--- | :--- | :--- |
| **Primary Scope** | Object shapes and class contracts | Objects, primitives, unions, intersections, tuples |
| **Extensibility** | `extends` keyword | Intersection operator (`&`) |
| **Declaration Merging** | Yes (merges declarations with the same name) | No (duplicate names throw a syntax error) |
| **Unions & Tuples** | Cannot directly define pure unions/tuples | Fully supported (`type Status = "A" \| "B"`) |

### Declaration Merging in Interfaces

- Declaring the same interface name multiple times merges their fields into a single unified contract:

```ts
interface Box {
  width: number;
}

interface Box {
  height: number;
}

// Both fields are required
const boxDemo: Box = { width: 10, height: 10 };
```

- Type aliases cannot be reopened:

```ts
type Bag = { size: number };
// type Bag = { color: string }; 
// Error: Duplicate identifier 'Bag'.
```

## 4. Index Signatures & Record Types (`020_index_signatures.ts`)

- When property keys are dynamic or not known ahead of time, TypeScript provides index signatures, utility types, and runtime collections.

- Patterns for Key-Value Data

| Pattern | Definition | Use Case |
| :--- | :--- | :--- |
| **Index Signature** | `{[key: string]: number}` | Completely open-ended string keys with values of uniform type |
| **`Record<K, V>` (Strict)** | `Record<"likes" \| "views", number>` | Closed set of known keys; all specified keys are required |
| **`Record<string, V>` (Loose)** | `Record<string, number \| undefined>` | Open string keys where lookups might return undefined |
| **Runtime `Map<K, V>`** | `new Map<string, number>()` | Dynamic key-value pairs requiring explicit collections, fast lookup |

- Code Examples

```ts
// 1. Dynamic Index Signature
type NumberDict = { [k: string]: number };
const counters: NumberDict = {};
counters["Likes"] = 1;
counters["Comments"] = 2;

// 2. Strict Record with Literal Keys
type Metrics = Record<"likes" | "views" | "shares", number>;
const mm: Metrics = { likes: 1, views: 100, shares: 23 };

// 3. Loose Record permitting undefined
type LooseMap = Record<string, number | undefined>;
const lm: LooseMap = {};
lm["x"] = undefined;
lm["y"] = 100;

// 4. Runtime ES Map
const priceMap = new Map<string, number>();
priceMap.set("likes", 1);
```
