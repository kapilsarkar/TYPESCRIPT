// ---------------------------------------------------------------
// 1. Explicit type annotations
// Write the type after the variable name with a colon.
// TypeScript will then only allow that type of value.
// ---------------------------------------------------------------

// string: text values
let firstName: string = "Kapil Sarkar";
console.log(firstName);

// number: integers and decimals
let age: number = 34;
console.log(age);

// boolean: true or false
let isMale: boolean = true;
console.log(isMale);

// ---------------------------------------------------------------
// 2. Type inference
// If you assign a value at declaration and skip the annotation,
// TypeScript figures out the type itself. Here LastName is
// inferred as `string`.
// ---------------------------------------------------------------
let LastName = "Sarkar";
console.log(LastName);

// ---------------------------------------------------------------
// 3. Declare first, assign later
// The type is fixed at declaration. The value can be assigned
// afterwards, but it must match the declared type.
// ---------------------------------------------------------------
let myName: string;
let myAge: number;
let is18: boolean;

myName = "Kapil Sarkar";
myAge = 34;
is18 = true;

console.log(`All Details ${myName}, ${myAge}, ${is18}`);

// ---------------------------------------------------------------
// 4. Union type (|)
// A variable can hold more than one allowed type.
// isGender can be a boolean OR a string, so changing it from
// true to "Male" is valid.
// ---------------------------------------------------------------
let isGender: boolean | string = true;

isGender = "Male";
console.log(isGender);