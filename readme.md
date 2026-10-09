# <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="72" height="72" alt="TypeScript Logo"> TypeScript Learning & Revision Hub

A structured, example-driven reference repository designed for mastering TypeScript from core primitives to advanced type mechanics.

---

## 📚 Study Guides & Curriculum

| **Topic** | **Covered Concepts** | **Link** |
|:---|:---|:---|
| **01. Core Fundamentals** | Inference, Primitives, `void` / `never` / `unknown`, Objects, Literals, Custom Guards, `as const`, Unions | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/TypeScript_Core_Fundamentals.md) |
| **02. Intermediate Types & Functions** | Intersections (`&`), Array syntax, `readonly` arrays, Tuples, Parameter annotations, Optional/Default values | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/TypeScript_Intermediate_Types_%26_Functions.md) |
| **03. Advanced Functions & Tuples** | Rest parameters, Tuple rest types, Array vs. `as const` spreading, Explicit return contracts, Async inference | [Open Guide](https://github.com/kapilsarkar/REACT-NEXTJS-LEARNING-WITH-AI-PROJECTS/blob/main/TYPESCRIPT/Typescript_Advanced_Functions_%26_Rest_Tuples.md) |
| **04. Interfaces, Type Aliases & Dictionaries** | Interface Fundamentals & Inheritance, Type Aliases & Compositions, Interfaces vs. Type Aliases, Index Signatures & Record Types | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Interfaces_Type_Aliases_%26_Dictionaries.md) |
| **05. Type Narrowing & Safe Property Access** | Type Narrowing, Safe Property Access, Runtime Checks, Type Guards | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Type_Narrowing_%26_Safe_Property_Access.md) |
| **06. Generics & Constraints** | Generic Type Parameters (`<T>`), Generic Functions & Type Inference, Generic Collections, Generic Return Shapes, Structural Constraints (`T extends`), Key-Lookup Constraints (`K extends keyof T`), `any` vs. `unknown` vs. Generics | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Generics_%26_Constarints.md) |
| **07. Type-Safe Property Accessors** | Indexed Access Types (`T[K]`), `keyof` Type & Key Unions, Key Constraints (`K extends keyof T`), Optional Property Types, Type-Safe Dynamic Getters & Setters | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Type_Safe_Property_Accessors.md) |
| **08. TypeScript Utility Types** | `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, V>`, Shallow Type Transformations | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Utility_Types.md) |
| **09. Function & Class Utility Types** | `ReturnType<T>`, `Parameters<T>`, `InstanceType<T>`, `ConstructorParameters<T>`, Function Type Extraction, Constructor & Instance Type Extraction, `typeof` for Value-to-Type Conversion | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TypeScript_Function_%26_Class_Utility_Types.md) |

---

## 🧪 Practice & Revision Guides

Additional practice files for reinforcing TypeScript fundamentals, understanding safe typing, and working with functions.

| **Topic** | **Covered Concepts** | **Link** |
|:---|:---|:---|
| **01. TypeScript Fundamentals** | Core TypeScript concepts, type annotations, inference, and fundamental types | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TYPESCRIPT-PRACTICE/TypeScript_Fundamentals.md) |
| **02. TypeScript `any` vs. `unknown`** | Differences between `any` and `unknown`, type safety, narrowing, and safer handling of unknown values | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TYPESCRIPT-PRACTICE/Typescript_Any_VS_Unknown.md) |
| **03. TypeScript Functions** | Function parameters, return types, optional and default parameters, and function typing | [Open Guide](https://github.com/kapilsarkar/TYPESCRIPT/blob/main/TYPESCRIPT-PRACTICE/TypeScript_Functions.md) |

---

## 🚀 Running Files Locally

### Option A: Standard Build & Run

**1. Compile TypeScript files:**

```bash
npx tsc
```

**2. Run the compiled JavaScript file from `dist`:**

```bash
node dist/02_primitive.js
```

### Option B: Direct Execution with `tsx`

Run a TypeScript file directly without manually compiling it first:

```bash
npx tsx 01_inference.ts
```

Alternatively, if `ts-node` is installed and configured:

```bash
npx ts-node 01_inference.ts
```

> **Note:** Use the file path that matches your project structure. If a file is inside `TYPESCRIPT-PRACTICE`, adjust the command accordingly.

---

## 🛠️ Prerequisites

- Node.js (v18 or higher recommended)
- npm or pnpm
- TypeScript
- `tsx` (optional, for direct TypeScript execution)
- `ts-node` (optional, alternative for direct TypeScript execution)

---

## 📈 Learning Approach

**Learn → Code → Practice → Create Revision Guide → Review → Move Forward**

Each topic is practiced through TypeScript examples and summarized in revision guides for future reference.

The goal is to build a strong TypeScript foundation before applying it to React, Next.js, Node.js, and full-stack applications.