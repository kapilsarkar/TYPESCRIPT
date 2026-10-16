// ---------------------------------------------------------------
// Type casting / type assertion
// Tells TypeScript "treat this value as this type".
// It only works at compile time: it does NOT convert the value or
// change anything at runtime.
// ---------------------------------------------------------------

// addOrConcat(2, 3, "add")    -> 5
// addOrConcat(2, 3, "concat") -> "23"

// Literal union type: c can only be exactly "add" or "concat".
// Return type is a union: the function returns a number OR a string.
function addOrConcat(a: number, b: number, c: "add" | "concat"): number | string {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b; // "" + number converts to a string, so this concatenates
}

// ---------------------------------------------------------------
// 1. Assertion with `as`
// The function returns string | number, but we know "concat"
// gives a string, so we assert it with `as string`.
// Without `as`, TypeScript gives this error:
//   Type 'string | number' is not assignable to type 'string'.
//   Type 'number' is not assignable to type 'string'.
// ---------------------------------------------------------------
const value: string = addOrConcat(20, 70, "concat") as string;

console.log(value);
const value2: number = addOrConcat(2, 3, "add") as number;
console.log(value2);

// ---------------------------------------------------------------
// 2. Angle-bracket assertion <type>
// Does the same job as `as`, but it does not work in .jsx or .tsx
// files (it clashes with JSX tags). Prefer `as` in general.
// ---------------------------------------------------------------
const value3: number = <number>addOrConcat(100, 200, "add");
console.log(value3);
console.log(addOrConcat(2, 3, "concat"));

// ---------------------------------------------------------------
// DOM (Document Object Model) with TypeScript
// getElementById returns HTMLElement | null, so we need:
//   !  (non-null assertion): says "this is definitely not null"
//   as (type assertion): picks the exact element type, so
//      element-specific properties like .value are available
// Runs in the browser only, and needs "dom" in tsconfig "lib".
// The ids below must match the ids in your HTML exactly.
// ---------------------------------------------------------------
const nameInput = document.getElementById("name")! as HTMLInputElement;
const ageInput = document.getElementById("number")! as HTMLInputElement;
const form = document.getElementById("user-from")! as HTMLFormElement;
const output = document.getElementById("output")! as HTMLElement;

// "submit" event: runs when the form is submitted.
form.addEventListener("submit", (e) => {
    e.preventDefault(); // stops the default page reload on submit
    const nameValue = nameInput.value; // .value is always a string, even for number inputs
    const ageValue = ageInput.value;
    console.log(nameValue, ageValue);
    // innerHTML renders text as HTML, so user input here can inject
    // scripts (XSS). For plain text, textContent is safer.
    output.innerHTML = `<p>Name : ${nameValue} Age : ${ageValue}</p>`;
});