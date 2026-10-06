# TypeScript Function & Class Utility Types — Revision Guide

A reference guide covering TypeScript's built-in type extraction utilities for functions and classes (`ReturnType`, `Parameters`, `InstanceType`, and `ConstructorParameters`) based on `027_utils_functions_union_helpers.ts`.

---

## Table of Contents

- [1. Overview & Core Concept](#1-overview--core-concept)
- [2. Quick Reference Summary Table](#2-quick-reference-summary-table)
- [3. Function Type Extraction](#3-function-type-extraction)
  - [`ReturnType<T>`](#returntypet)
  - [`Parameters<T>`](#parameterst)
  - [End-to-End Function Example](#end-to-end-function-example)
- [4. Class & Constructor Type Extraction](#4-class--constructor-type-extraction)
  - [`InstanceType<T>`](#instancetypet)
  - [`ConstructorParameters<T>`](#constructorparameterst)
  - [End-to-End Class Example](#end-to-end-class-example)
- [5. Why Use `typeof` with These Utilities?](#5-why-use-typeof-with-these-utilities)

---

## 1. Overview & Core Concept

> **Definition:** Function and constructor utility types extract type metadata directly from existing runtime functions and classes, eliminating the need to declare duplicate types manually.

* **Single Source of Truth:** Your runtime function or class defines the shape; TypeScript derives the types automatically.
* **Refactor-Proof:** Updating the implementation automatically updates all derived parameter and return types across your project.

---

## 2. Quick Reference Summary Table

| Utility Type | Target Input | Extracted Type | Common Use Case |
| :--- | :--- | :--- | :--- |
| `ReturnType<F>` | Function type | The return value type | Typing API outputs, hook returns, or handler results |
| `Parameters<F>` | Function type | Tuple of parameter types | Intercepting, forwarding, or testing function arguments |
| `InstanceType<C>` | Constructor type | Instance shape created by `new` | Factory patterns, dependency injection containers |
| `ConstructorParameters<C>` | Constructor type | Tuple of constructor arguments | Dynamic class instantiation, wrapping class constructors |

---

## 3. Function Type Extraction

### `ReturnType<T>`

Extracts the inferred return type of a function signature.

### `Parameters<T>`

Extracts parameter types as a fixed-order tuple.

### End-to-End Function Example

```ts
function ExtractUserInfo(id: string, isExtraInfo = false) {
  return {
    id,
    name: 'Kapil',
    log: isExtraInfo ? 'details' : (undefined as string | undefined),
  };
}

// 1. Extract the return type
// Inferred: { id: string; name: string; log: string | undefined }
type GetUsersReturnInfo = ReturnType<typeof ExtractUserInfo>;

// 2. Extract the parameter types as a tuple
// Inferred: [id: string, isExtraInfo?: boolean]
type GetUserParamsInfo = Parameters<typeof ExtractUserInfo>;

// 3. Use extracted parameter tuple to pass arguments safely
const argsInfo: GetUserParamsInfo = ['u1', true];
const resultInfo: GetUsersReturnInfo = ExtractUserInfo(...argsInfo);

console.log(resultInfo);
// Output: { id: 'u1', name: 'Kapil', log: 'details' }
```

## 4. Class & Constructor Type Extraction

- InstanceType`<T>`
- Extracts the instance type resulting from invoking a constructor with new.

- ConstructorParameters`<T>`
- Extracts constructor parameters as a typed tuple.

### End-to-End Class Example

```ts
class Person {
  constructor(public name: string, public age: number) {}

  greet(): string {
    return `Hi, I am ${this.name}`;
  }
}

// 1. Extract instance type (equivalent to the shape produced by `new Person(...)`)
type PersonInstance = InstanceType<typeof Person>;

// 2. Extract constructor arguments as a tuple
// Inferred: [name: string, age: number]
type PersonCtorArgs = ConstructorParameters<typeof Person>;

// 3. Instantiate safely with spread constructor arguments
const constructorArgs: PersonCtorArgs = ['Kapil', 34];
const person: PersonInstance = new Person(...constructorArgs);

console.log(person.greet());
// Output: "Hi, I am Kapil"
```

## 5. Why Use typeof with These Utilities?

- In TypeScript, runtime values (functions, classes) and types exist in separate spaces:

```ts
// ExtractUserInfo is a JavaScript function (runtime value)
// typeof ExtractUserInfo accesses its TypeScript type signature

type Bad = ReturnType<ExtractUserInfo>; 
// Error: 'ExtractUserInfo' refers to a value, but is being used as a type here.

type Good = ReturnType<typeof ExtractUserInfo>; 
// Correct: typeof converts value space -> type space
```

### For classes:

- `Person` as a type refers to the instance `(PersonInstance)`.
- `typeof Person` refers to the constructor function itself (the class object that contains `new (...))`.

