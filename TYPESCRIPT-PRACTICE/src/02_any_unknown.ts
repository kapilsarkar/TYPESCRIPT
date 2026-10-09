// ---------------------------------------------------------------
// 1. any type
// Turns off type checking for this variable. It can hold any value
// and you can call any method on it without TypeScript checking.
// Risky: mistakes only show up at runtime.
// ---------------------------------------------------------------
let sameVariable: any;
sameVariable = 12;
console.log(sameVariable.toFixed(3)); // "12.000"

// ---------------------------------------------------------------
// 2. unknown type
// A safer alternative to any. It can hold any value, but you must
// check its type first (type narrowing) before using it.
// ---------------------------------------------------------------
let unknownVariable: unknown;
let boolVar: boolean;

unknownVariable = 50;

// typeof check narrows `unknown` to `number` inside this block,
// so number methods like toFixed() are now allowed.
if (typeof unknownVariable === "number") {
  console.log(unknownVariable.toFixed(3)); // "50.000"
}

unknownVariable = true;

// Narrowing to `boolean` lets us safely assign it to a boolean
// variable. Without this check, TypeScript would show an error.
if (typeof unknownVariable === "boolean") {
  boolVar = unknownVariable;
  console.log(boolVar); // true
}

// ---------------------------------------------------------------
// Quick difference:
//   any     -> no checks at all, use anything freely (unsafe)
//   unknown -> must narrow the type first (safe)
// ---------------------------------------------------------------