# TypeScript Functions Revision Guide

A comprehensive quick-reference guide covering function declarations, arrow functions, parameter variations, return types (`void` vs `never`), and function overloading.

---

## 1. Function Syntax Variations

### 1.1 Function Declaration

Standard named functions with explicit parameter and return types. These are **hoisted** and can be called before their definition.

```typescript
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(2, 3)); // 5
```

### 1.2 Function Expression

An anonymous function assigned to a variable. These are **not hoisted** and can only be invoked after assignment.

```typescript
const add2 = function (a: number, b: number): number {
    return a + b;
};

console.log(add2(100, 200)); // 300
```

### 1.3 Arrow Functions

* **Block Body:** Enclosed in `{}` and requires an explicit `return` statement.
* **Implicit Return:** Omits `{}` and automatically returns the evaluated expression.

```typescript
// Block body (explicit return)
const add3 = (a: number, b: number): number => {
    return a + b;
};
console.log(add3(500, 500)); // 1000

// Concise body (implicit return)
const add4 = (a: number, b: number): number => a + b;
console.log(add4(1000, 1000)); // 2000
```

---

## 2. Parameters: Optional vs. Default

| Technique | Syntax | Under the Hood | Example |
| :--- | :--- | :--- | :--- |
| **Optional Parameter (`?`)** | `param?: type` | Type becomes `type \| undefined` | `greet2(name?: string)` |
| **Default Parameter (`=`)** | `param: type = fallback` | Automatically infers type and uses default if `undefined` | `greet3(name: string = "Guest")` |

```typescript
// Optional parameter with nullish coalescing (??)
function greet2(name?: string): void {
    console.log(`Hello ${name ?? 'Guest'}`);
}
greet2("Virat Kohli"); // "Hello Virat Kohli"
greet2();              // "Hello Guest"

// Default parameter
function greet3(name: string = "Guest"): void {
    console.log(`Hello ${name}`);
}
greet3();                   // "Hello Guest"
greet3("Sachin Tendulkar"); // "Hello Sachin Tendulkar"
```

---

## 3. Special Return Types: `void` vs. `never`

```typescript
// void: The function completes successfully but produces no value
function greet(name: string): void {
    console.log(`Hello ${name}`);
}

// never: The function never reaches a return point (throws error or infinite loop)
function throwError(message: string): never {
    throw new Error(message);
}
```

### Quick Comparison

| Characteristic | `void` | `never` |
| :--- | :--- | :--- |
| **Execution** | Runs to completion | Never completes normally |
| **Actual Return Value** | Returns `undefined` at runtime | Nothing returned (crashes or runs indefinitely) |
| **Primary Use Cases** | Side effects (logging, DOM updates, event callbacks) | Exhaustive type checks, error throwing utilities |

---

## 4. Function Overloading

Function overloading allows a single function to accept different combinations of argument types or counts while providing strong compile-time type safety.

1. **Overload Signatures:** Define what callers are allowed to pass and what return type to expect (no implementation body).
2. **Implementation Signature:** The actual function implementation. It must accept a union/general type compatible with all overload signatures.

### Example A: Overloading by Parameter Type

```typescript
// 1. Overload signatures
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;

// 2. Implementation signature
function combine(a: number | string, b: number | string): string | number {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + " " + b;
    } else {
        throwError("Invalid Args");
    }
}

console.log(combine(1, 2));            // 3 (typed as number)
console.log(combine("Hello", "World")); // "Hello World" (typed as string)
```

### Example B: Overloading by Parameter Count

```typescript
// Overload signatures
function greet5(): string;
function greet5(name: string): string;

// Implementation signature with optional parameter
function greet5(name?: string): string {
    return `Hello ${name ?? 'Guest'}`;
}

console.log(greet5());                 // "Hello Guest"
console.log(greet5("Rahul Dravid"));   // "Hello Rahul Dravid"
```

---

## Quick Reference Summary

| Feature | Key Syntax | Notes |
| :--- | :--- | :--- |
| **Declaration** | `function f(x: T): R {}` | Hoisted |
| **Expression** | `const f = function(x: T): R {}` | Not hoisted |
| **Arrow (Implicit)** | `const f = (x: T): R => x * 2` | Clean single-expression return |
| **Optional Parameter** | `(x?: string)` | Parameter type becomes `string \| undefined` |
| **Default Parameter** | `(x: string = "val")` | Automatically substitutes if `undefined` |
| **`void`** | `(): void` | Returns `undefined` |
| **`never`** | `(): never` | Throws error or loops indefinitely |
| **Overloading** | Multiple `function f(...)` lines before body | Enforces strictly defined call patterns |
