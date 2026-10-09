// ---------------------------------------------------------------
// 1. Function declaration
// Named function with typed parameters and a typed return value.
// Hoisted, so it can be called before it is defined.
// ---------------------------------------------------------------
function add(a: number, b: number): number {
    return a + b;
}

console.log(add(2, 3));

// ---------------------------------------------------------------
// 2. Function expression
// An anonymous function stored in a variable.
// Not hoisted: it can only be called after this line.
// ---------------------------------------------------------------
const add2 = function (a: number, b: number): number {
    return a + b;
};

console.log(add2(100, 200));

// ---------------------------------------------------------------
// 3. Arrow function (block body)
// Shorter syntax using =>. Curly braces need an explicit `return`.
// ---------------------------------------------------------------
const add3 = (a: number, b: number): number => {
    return a + b;
};

console.log(add3(500, 500));

// ---------------------------------------------------------------
// 4. Arrow function (implicit return)
// With no curly braces, the expression after => is returned
// automatically.
// ---------------------------------------------------------------
const add4 = (a: number, b: number): number => a + b;

console.log(add4(1000, 1000));

// ---------------------------------------------------------------
// 5. void return type
// Used when a function does its work (like logging) and returns
// nothing.
// ---------------------------------------------------------------
function greet(name: string): void {
    console.log(`Hello ${name}`);
}

greet('Kapil Sarkar');

// ---------------------------------------------------------------
// 6. Optional parameter (?)
// `name` may be omitted; its type becomes string | undefined.
// `??` (nullish coalescing) supplies 'Guest' when it is missing.
// ---------------------------------------------------------------
function greet2(name?: string): void {
    console.log(`Hello ${name ?? 'Guest'}`);
}

greet2("Virat Kohli");
greet2();

// ---------------------------------------------------------------
// 7. Default parameter
// If no argument is passed, `name` automatically becomes "Guest".
// ---------------------------------------------------------------
function greet3(name: string = "Guest"): void {
    console.log(`Hello ${name}`);
}

greet3();
greet3("Sachin Tendulkar");

// ---------------------------------------------------------------
// 8. never return type
// For functions that never finish normally, e.g. they always
// throw an error or run an infinite loop.
// ---------------------------------------------------------------
function throwError(message: string): never {
    throw new Error(message);
}

// throwError("Custom error message");

// ---------------------------------------------------------------
// 9. Function overloading (by parameter type)
// The first two lines are overload signatures (what callers see).
// The last one is the implementation signature (what actually runs)
// and must be compatible with all overloads.
//   - number + number -> number (sum)
//   - string + string -> string (joined with a space)
// ---------------------------------------------------------------
function combine(a: number, b: number): number;
function combine(a: string, b: string): string;

function combine(a: number | string, b: number | string): string | number {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + " " + b;
    } else {
        throwError("Invalid Args");
    }
}

console.log(combine(1, 2));
console.log(combine("Hello", "World"));

// ---------------------------------------------------------------
// 10. Function overloading (by parameter count)
// Can be called with no argument or with one string argument.
// The implementation uses an optional parameter to handle both.
// ---------------------------------------------------------------
function greet5(): string;
function greet5(name: string): string;

function greet5(name?: string): string {
    return `Hello ${name ?? 'Guest'}`;
}

console.log(greet5());
console.log(greet5("Rahul Dravid"));