# TypeScript: `any` vs `unknown`

A quick reference guide and revision sheet on handling dynamic and uncertain data types in TypeScript.

---

## 1. The `any` Type (Unsafe)

The `any` type completely disables TypeScript's static type-checking mechanism for that variable. You can assign any value to it and access arbitrary properties or methods without compile-time errors.

> ⚠️ **Risk:** Type-related errors will only surface at runtime, defeating TypeScript's primary advantage.

```typescript
let sameVariable: any;

sameVariable = 12;

// Allowed by TypeScript without checks:
console.log(sameVariable.toFixed(3)); // Output: "12.000"

// Danger: No compile-time error, but this crashes at runtime!
// sameVariable.toUpperCase(); // TypeError: sameVariable.toUpperCase is not a function
```

---

## 2. The `unknown` Type (Type-Safe)

The `unknown` type is the type-safe counterpart to `any`. While it can hold any arbitrary value, TypeScript will **not** let you call methods, access properties, or assign it to other typed variables until you prove its type via **type narrowing** (e.g., using `typeof`, `instanceof`, or custom type guards).

```typescript
let unknownVariable: unknown;
let boolVar: boolean;

// --- Example A: Narrowing to `number` ---
unknownVariable = 50;

// TypeScript blocks this if run directly:
// unknownVariable.toFixed(3); // Error: Object is of type 'unknown'.

// Performing a runtime check narrows the type inside the branch:
if (typeof unknownVariable === "number") {
  console.log(unknownVariable.toFixed(3)); // Output: "50.000" (Safe!)
}

// --- Example B: Narrowing to `boolean` ---
unknownVariable = true;

// Directly assigning causes an error:
// boolVar = unknownVariable; // Error: Type 'unknown' is not assignable to type 'boolean'.

// Safe assignment through type narrowing:
if (typeof unknownVariable === "boolean") {
  boolVar = unknownVariable;
  console.log(boolVar); // Output: true
}
```

---

## Summary: `any` vs `unknown`

| Feature | `any` | `unknown` |
| :--- | :--- | :--- |
| **Type Safety** | ❌ None (bypasses compiler) | ✅ Strict (compiler enforces checks) |
| **Accepts Any Value?** | Yes | Yes |
| **Allowed Direct Operations?** | Yes (can call any property/method) | ❌ No (requires type narrowing first) |
| **Assignable to Other Types?** | Yes (assignable to almost any type) | ❌ Only assignable to `any` and `unknown` |
| **Primary Use Case** | Rapid prototyping or migrating legacy JS | Handling unpredictable inputs (e.g., APIs, user input, JSON) |
