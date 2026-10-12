# Arrays and Tuples: Revision Notes

Revision notes for `arrays-and-tuples.ts`.

Run the file with:

```bash
npx ts-node arrays-and-tuples.ts
```

---

## What the file covers

1. Typed arrays
2. Type inference
3. Union arrays (multiple types)
4. Array of objects
5. `readonly` arrays
6. Tuples

---

## 1. Typed arrays

Syntax: `type[]`. Only values of that type are allowed inside.

```typescript
const fruits: string[] = ['apple', 'mango'];
const numbers: number[] = [20, 30];

numbers.push(50);       // OK
// fruits.push(21);     // Error: number is not assignable to string
```

---

## 2. Type inference

With no annotation, TypeScript infers the array type from its values.

```typescript
const cricketers = ["Sachin", "Virat"]; // inferred as string[]
```

---

## 3. Union arrays

Use `(type1 | type2)[]` when items can be of different types.

```typescript
const myArray: (string | number)[] = [1, 2, "Sachin Tendulkar"];
myArray.push(20);
myArray.push("Virat Kohli");
```

The brackets matter:

| Type | Meaning |
|------|---------|
| `(string \| number)[]` | Array where each item is a string or a number |
| `string \| number[]` | A single string, or an array of numbers |

---

## 4. Array of objects

Use an interface (or type) as the item type. Optional properties can be left out.

```typescript
interface Person {
    firstName: string;
    lastName: string;
    age?: number;
}

const person: Person[] = [{ firstName: "Kapil", lastName: "Sarkar" }];
person.push({ firstName: "Virat", lastName: "Kohli" });
```

---

## 5. `readonly` arrays

The array cannot be changed after creation. Methods that modify it are not available.

```typescript
const person2: readonly Person[] = [{ firstName: "John", lastName: "Cena" }];
// person2.push(...)  // Error: Property 'push' does not exist on type 'readonly Person[]'
```

---

## 6. Tuples

An array with a **fixed length** and a **fixed type at each position**.

```typescript
type MyCustomTupleType = [string, string, number];
const myCustomTuple: MyCustomTupleType = ["abc", "def", 123];
```

---

## Array vs Tuple

| | Array | Tuple |
|---|-------|-------|
| Length | Any | Fixed |
| Type per position | Same type (or union) for all | Specific type for each position |
| Example | `string[]` | `[string, number]` |

---

## Common mistakes to remember

1. Pushing a value of the wrong type into a typed array gives an error.
2. `(string | number)[]` and `string | number[]` are different types.
3. `readonly` arrays have no `push`, `pop`, or other modifying methods.
4. In a tuple, order and length matter: `["abc", 123]` does not match `[string, string, number]`.
5. A `const` array can still be modified (push, pop). `const` only stops reassigning the variable. Use `readonly` to block changes.
