// ---------------------------------------------------------------
// 1. Arrays
// Syntax: type[]  (e.g. string[] = array of strings)
// TypeScript only allows values of that type inside the array.
// ---------------------------------------------------------------
const fruits: string[] = ['apple', 'mango'];
const numbers: number[] = [20, 30];

// fruits.push(21) // Error: Argument of type 'number' is not assignable to parameter of type 'string'

numbers.push(50);
console.log(fruits);
console.log(numbers);

// ---------------------------------------------------------------
// 2. Type inference
// With no annotation, TypeScript infers the type from the values.
// Here cricketers is inferred as string[].
// ---------------------------------------------------------------
const cricketers = ["Sachin", "Virat"]; // inferred as string[]
console.log(cricketers);

// ---------------------------------------------------------------
// 3. Array with multiple types (union array)
// (string | number)[] means each item can be a string OR a number.
// Note: the brackets matter. string | number[] means something else
// (a single string, or an array of numbers).
// ---------------------------------------------------------------
const myArray: (string | number)[] = [1, 2, "Sachin Tendulkar"];
myArray.push(20);
myArray.push("Virat Kohli");
console.log(myArray);

// ---------------------------------------------------------------
// 4. Array of objects
// Use an interface (or type) as the array item type.
// Optional properties (age?) can be left out.
// ---------------------------------------------------------------
interface Person {
    firstName: string;
    lastName: string;
    age?: number;
}

const person: Person[] = [
    { firstName: "Kapil", lastName: "Sarkar" }
];

person.push({ firstName: "Virat", lastName: "Kohli" });

console.log(person);

// ---------------------------------------------------------------
// 5. readonly array
// The array cannot be changed after creation. Methods that modify
// it (push, pop, etc.) are not available on the type.
// ---------------------------------------------------------------
const person2: readonly Person[] = [
    { firstName: "John", lastName: "Cena" }
];

console.log(person2);
// person2.push({ firstName: "dsd", lastName: "saf" }) // Error: Property 'push' does not exist on type 'readonly Person[]'

// ---------------------------------------------------------------
// 6. Tuples
// An array with a FIXED length and a fixed type at each position.
// Order matters: [string, string, number] must be exactly that.
// ---------------------------------------------------------------
type MyCustomTupleType = [string, string, number];
const myCustomTuple: MyCustomTupleType = ["abc", "def", 123];
console.log(myCustomTuple);