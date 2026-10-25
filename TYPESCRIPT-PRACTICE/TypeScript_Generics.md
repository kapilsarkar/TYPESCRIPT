# Generics: Revision Notes

Revision notes for the generics file (`generics.ts`).

Run the file with:

```bash
npx ts-node generics.ts
```

---

## What are generics?

Generics let a function (or class/interface) work with many types while keeping type safety. The type is passed in like a variable, using a **type parameter** such as `<T>`.

---

## What the file covers

1. The problem with `any`
2. Generic function (`<T>`)
3. Type inference with generics
4. Generic constraints (`extends`)
5. Generics with arrays (`T[]`)
6. Multiple type parameters (`<T, U>`)
7. Constraint with an object shape

---

## 1. The problem with `any`

`any` turns off type checking. The return type is also `any`, so TypeScript cannot warn about mistakes.

```typescript
function identity(data: any) {
    return data;
}

const value = identity("Hello World");
console.log(value.toLowerCase());   // "hello world"

// identity(5).toLowerCase();       // compiles, but crashes at runtime (TypeError)
```

---

## 2. Generic function

`<T>` is a placeholder for a type. Whatever type goes in is the type that comes out. `T` is the common name, but any name works (`T`, `U`, `TData`).

```typescript
function identityTwo<T>(data: T) {
    return data;
}

const identityResult = identityTwo<string>("Hello Kapil");
console.log(identityResult.toUpperCase());   // string methods are available and checked

const identityResult2 = identityTwo<number>(5);
// identityResult2.toUpperCase();  // Error: 'toUpperCase' does not exist on type 'number'
```

| | `any` | Generic `<T>` |
|---|-------|---------------|
| Type checking | Off | On |
| Return type | `any` | Same as input type |
| Mistakes caught | At runtime | At compile time |

---

## 3. Type inference with generics

`<T>` can be left out. TypeScript infers it from the argument.

```typescript
const identityResult4 = identityTwo("Inferred type");  // T inferred as string
console.log(identityResult4.length);
```

---

## 4. Generic constraints (`extends`)

`T extends string | number` limits `T` to those types only. Any other type is rejected at compile time.

```typescript
function identityWithConstraints<T extends string | number>(data: T): T {
    return data;
}

identityWithConstraints<string>("Hello World");   // OK
identityWithConstraints<number>(5);               // OK
// identityWithConstraints<boolean>(true);
// Error: Type 'boolean' does not satisfy the constraint 'string | number'.
```

---

## 5. Generics with arrays

`T[]` means "an array of T". The element type decides the return type.

```typescript
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

getFirstElement<string>(["abcd", "efgh"]);  // "abcd"
getFirstElement<number>([100, 200]);        // 100
getFirstElement([true, false]);             // true (T inferred as boolean)
getFirstElement<number>([]);                // undefined at runtime
```

An empty array returns `undefined` at runtime, even though the return type says `T`.

---

## 6. Multiple type parameters

Use more than one placeholder (`T`, `U`) when values have different types. The return type `[T, U]` is a **tuple**: fixed length, with a specific type at each position.

```typescript
function pair<T, U>(key: T, val: U): [T, U] {
    return [key, val];
}

pair("name", "kapil");            // ["name", "kapil"]
pair<string, number>("age", 34);  // ["age", 34]
```

---

## 7. Constraint with an object shape

`T extends { length: number }` accepts any type that has a numeric `length` property (string, array, or a custom object), so `data.length` is safe to use.

```typescript
function getLength<T extends { length: number }>(data: T): number {
    return data.length;
}

getLength("Hi Virat Kohli");   // 14
getLength([1, 5, 6]);          // 3
getLength({ length: 10 });     // 10
// getLength(123);             // Error: number has no 'length' property
```

---

## Quick reference

| Syntax | Meaning |
|--------|---------|
| `<T>` | One type parameter |
| `<T, U>` | Two type parameters |
| `T[]` | Array of T |
| `T extends X` | T must be X or a subtype of X |
| `[T, U]` | Tuple with a T then a U |
| `fn<string>(...)` | Pass the type explicitly |
| `fn(...)` | Let TypeScript infer the type |

---

## Common mistakes to remember

1. `any` removes type safety. Use generics when you want the input and output types to match.
2. Without a constraint, TypeScript knows nothing about `T`, so you cannot use `.length` or other properties on it.
3. A constraint is checked at compile time. Passing a type that does not match is an error.
4. `getFirstElement([])` returns `undefined` at runtime even though the return type says `T`.
5. `<T>` can often be left out. Pass it explicitly only when inference does not give the type you want.