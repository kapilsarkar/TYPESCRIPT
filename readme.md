# <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="72" height="72" alt="TypeScript Logo"> TypeScript Learning & Revision Hub

A structured, example-driven reference repository designed for mastering TypeScript from core primitives to advanced type mechanics.

---

## 📚 Study Guides & Curriculum

| Topic | Covered Concepts | Link |
| :--- | :--- | :--- |
| **01. Core Fundamentals** | Inference, Primitives, `void`/`never`/`unknown`, Objects, Literals, Custom Guards, `as const`, Unions | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/TypeScript_Core_Fundamentals.md) |
| **02. Intermediate Types & Functions** | Intersections (`&`), Array syntax, `readonly` arrays, Tuples, Parameter annotations, Optional/Default values | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/TypeScript_Intermediate_Types_%26_Functions.md) |
| **03. Advanced Functions & Tuples** | Rest parameters, Tuple rest types, Array vs `as const` spreading, Explicit return contracts, Async inference | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/Typescript_Advanced_Functions_%26_Rest_Tuples.md) |
| **04. Interfaces, Type Aliases & Dictionaries** | Interface Fundamentals & Inheritance, Type Aliases & Compositions, Interfaces vs. Type Aliases, Index Signatures & Record Types | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Interfaces_Type_Aliases_%26_Dictionaries.md) |
| **05. Type Narrowing & Safe Property Access** | Type Narrowing, Safe Property Access, Runtime Checks, Type Guards | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Type_Narrowing_%26_Safe_Property_Access.md) |
| **06. Generics & Constraints** | Generic Type Parameters (`<T>`), Generic Functions & Type Inference, Generic Collections, Generic Return Shapes, Structural Constraints (`T extends`), Key-Lookup Constraints (`K extends keyof T`), `any` vs `unknown` vs Generics | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Generics_%26_Constarints.md) |
| **07. Type-Safe Property Accessors** | Indexed Access Types (`T[K]`), `keyof` Type & Key Unions, Key Constraints (`K extends keyof T`), Optional Property Types, Type-Safe Dynamic Getters & Setters | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Type_Safe_Property_Accessors.md) |
| **08. TypeScript Utility Types** | `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, Shallow Type Transformations | **[Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Utility_Types.md)** |

---

## 🚀 Running Files Locally

### Option A: Standard Build & Run (Production Flow)

1. **Compile all files with the TypeScript compiler:**

```bash
   npx tsc
```

2. **Run the compiled JavaScript from `dist`:**

```bash
   node dist/02_primitive.js
```

### Option B: Direct Execution (Fast Development)

Run TypeScript files directly, with no manual compile step, using `tsx`:

```bash
npx tsx 01_inference.ts
```

Alternatively, use `ts-node`:

```bash
npx ts-node 01_inference.ts
```

---

## 🛠️ Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm