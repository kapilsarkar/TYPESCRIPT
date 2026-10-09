# TypeScript Fundamentals: Variables & Primitive Types

- A concise revision reference for TypeScript basic typing, variable declarations, and type inferences.

## 1. Explicit Type Annotations

- Explicit typing defines the exact data type a variable is allowed to hold using the syntax `variable: type`. Attempting to assign an incompatible type causes a compile-time error.

```ts
// string: text values
let firstName: string = "Kapil Sarkar";

// number: handles both integers and floating-point values
let age: number = 34;

// boolean: true or false
let isMale: boolean = true;
```

## 2. Type Inference

- TypeScript automatically detects and locks in the type based on the value assigned at the time of declaration. Manual annotations are optional when an initial value is provided.

```ts
// TypeScript infers `LastName` as type `string`
let LastName = "Sarkar";

// This will fail:
// LastName = 100; // Error: Type 'number' is not assignable to type 'string'.
```

## 3. Declare First, Assign Later

- Variables can be declared with a fixed type before being initialized. The assigned value must adhere to the defined type upon assignment.

```ts
let myName: string;
let myAge: number;
let is18: boolean;

// Value initialization
myName = "Kapil Sarkar";
myAge = 34;
is18 = true;

console.log(`All Details: ${myName}, ${myAge}, ${is18}`);
```

## 4. Union Types (|)

- Union types allow a variable to store values from two or more distinct types using the pipe operator (|).

```ts
// Can store either a boolean OR a string
let isGender: boolean | string = true;

// Reassignment to string is valid
isGender = "Male";
```

## Key Takeaways

### TypeScript Variable Typing Cheatsheet

Quick revision table covering basic variable typing patterns in TypeScript.

| Feature | Syntax Example | When to Use |
| :--- | :--- | :--- |
| **Explicit Typing** | `let x: number = 10;` | When declaring variables without immediate values or enforcing strict interfaces |
| **Type Inference** | `let x = "text";` | Clean code when initializing with straightforward literal values |
| **Separated Assignment** | `let x: string; x = "a";` | When values are populated conditionally or later in the lifecycle |
| **Union Types** | `let x: string \| number;` | When an entity can validly represent multiple formats (e.g., IDs, status flags) |
