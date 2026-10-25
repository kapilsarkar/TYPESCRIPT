// ---------------------------------------------------------------
// Generics
// Let a function (or class/interface) work with many types while
// keeping type safety. The type is passed in like a variable.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 1. Identity function with `any` (the problem)
// `any` turns off type checking: the return type is also `any`,
// so TypeScript cannot warn about mistakes.
// ---------------------------------------------------------------
function identity(data: any) {
    return data;
}

const value = identity("Hello World");
console.log(value.toLowerCase()); // "hello world"

// Compiles without any error, but crashes at runtime
// (numbers have no toLowerCase):
// identity(5).toLowerCase(); // TypeError

// ---------------------------------------------------------------
// 2. Identity function with generics (the solution)
// <T> is a type parameter (a placeholder for a type).
// Whatever type goes in is the type that comes out.
// T is the common name; any name works (T, U, TData...).
// ---------------------------------------------------------------
function identityTwo<T>(data: T) {
    return data;
}

// Passing the type explicitly: <string>. The result is a string,
// so string methods like toUpperCase() are available and checked.
const identityResult = identityTwo<string>("Hello Kapil Welcome to Identity Function");
console.log(identityResult.toUpperCase());

const identityResult2 = identityTwo<number>(5);
console.log(identityResult2);
// identityResult2.toUpperCase(); // Error: Property 'toUpperCase' does not exist on type 'number'

const identityResult3 = identityTwo<boolean>(true);
console.log(identityResult3);

// ---------------------------------------------------------------
// 3. Type inference with generics
// <T> can be left out. TypeScript infers it from the argument.
// Here T is inferred as string.
// ---------------------------------------------------------------
const identityResult4 = identityTwo("Inferred type");
console.log(identityResult4.length);


// ---------------------------------------------------------------
// 4. Generic constraints (extends)
// `T extends string | number` limits T to those types only.
// Any other type is rejected at compile time.
// ---------------------------------------------------------------
function identityWithConstraints<T extends string | number>(data: T): T {
    return data;
}

const result5 = identityWithConstraints<string>("Hello World");
const result6 = identityWithConstraints<number>(5);
console.log(result5); // "Hello World"
console.log(result6); // 5

// const result7 = identityWithConstraints<boolean>(true);
// Error: Type 'boolean' does not satisfy the constraint 'string | number'.

// ---------------------------------------------------------------
// 5. Generic with arrays
// T[] means "an array of T". The element type decides the return
// type: string[] returns a string, number[] returns a number.
// ---------------------------------------------------------------
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

console.log(getFirstElement<string>(["abcd", "efgh"])); // "abcd"
console.log(getFirstElement<number>([100, 200]));       // 100

// Type inference: <T> can be left out, it is inferred from the array.
console.log(getFirstElement([true, false]));            // true

// Note: an empty array returns undefined at runtime, even though
// the return type says T.
console.log(getFirstElement<number>([]));               // undefined

// ---------------------------------------------------------------
// 6. Multiple type parameters
// Use more than one placeholder (T, U) when values have different
// types. The return type [T, U] is a tuple: fixed length, with a
// specific type at each position.
// ---------------------------------------------------------------
function pair<T, U>(key: T, val: U): [T, U] {
    return [key, val];
}

console.log(pair("name", "kapil"));        // ["name", "kapil"]
console.log(pair<string, number>("age", 34)); // ["age", 34]

// ---------------------------------------------------------------
// 7. Constraint with an object shape
// `T extends { length: number }` accepts any type that has a
// numeric `length` property (string, array, etc.), so
// data.length is safe to use inside the function.
// ---------------------------------------------------------------
function getLength<T extends { length: number }>(data: T): number {
    return data.length;
}

console.log(getLength("Hi Virat Kohli")); // 14
console.log(getLength([1, 5, 6]));        // 3
console.log(getLength({ length: 10 }));   // 10 (any object with length works)

// getLength(123);
// Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.