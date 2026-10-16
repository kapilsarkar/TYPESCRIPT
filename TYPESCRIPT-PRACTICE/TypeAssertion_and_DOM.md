# Type Assertion and DOM: Revision Notes

Revision notes for `type-assertion-dom.ts`.

The first part (type assertion) can be run with `npx ts-node`. The DOM part runs in the **browser only**, so it needs an HTML page and `"dom"` in the `lib` option of `tsconfig.json`.

---

## What the file covers

1. Literal union types and union return types
2. Type assertion with `as`
3. Angle-bracket assertion `<type>`
4. Typing DOM elements (`!` and `as`)
5. Handling a form submit event

---

## 1. Type assertion (type casting)

Tells TypeScript "treat this value as this type". It works at **compile time only**. It does not convert the value or change anything at runtime.

```typescript
function addOrConcat(a: number, b: number, c: "add" | "concat"): number | string {
    if (c === "add") {
        return a + b;
    }
    return "" + a + b;
}

addOrConcat(2, 3, "add");     // 5
addOrConcat(2, 3, "concat");  // "23"
```

- `"add" | "concat"` is a **literal union**: only those exact strings are allowed.
- `number | string` is a **union return type**.

---

## 2. Assertion with `as`

The function returns `string | number`, but we know `"concat"` gives a string.

```typescript
const value: string = addOrConcat(20, 70, "concat") as string;
const value2: number = addOrConcat(2, 3, "add") as number;
```

Without `as`, TypeScript gives this error:

```
Type 'string | number' is not assignable to type 'string'.
```

---

## 3. Angle-bracket assertion

Does the same job as `as`.

```typescript
const value3: number = <number>addOrConcat(100, 200, "add");
```

It does **not** work in `.jsx` or `.tsx` files (it clashes with JSX tags). Prefer `as`.

| Syntax | Works in `.tsx` | Preferred |
|--------|-----------------|-----------|
| `value as number` | Yes | Yes |
| `<number>value` | No | No |

---

## 4. Typing DOM elements

`getElementById` returns `HTMLElement | null`. Two things are needed:

| Syntax | Purpose |
|--------|---------|
| `!` (non-null assertion) | Says "this is definitely not null" |
| `as HTMLInputElement` | Picks the exact element type, so properties like `.value` are available |

```typescript
const nameInput = document.getElementById("name")! as HTMLInputElement;
const form = document.getElementById("user-form")! as HTMLFormElement;
```

Common element types: `HTMLInputElement`, `HTMLFormElement`, `HTMLElement`, `HTMLButtonElement`.

---

## 5. Form submit event

```typescript
form.addEventListener("submit", (e) => {
    e.preventDefault();               // stops the page reload
    const nameValue = nameInput.value;
    const ageValue = ageInput.value;  // always a string, even for number inputs
    output.textContent = `Name : ${nameValue} Age : ${ageValue}`;
});
```

---

## Common mistakes to remember

1. Assertions do not change the value at runtime. They only tell the compiler what to expect.
2. `!` hides a possible `null` from TypeScript. If the id does not exist in your HTML, the code still crashes at runtime.
3. The ids in `getElementById` must match the HTML exactly (for example `user-form`, not `user-from`).
4. `input.value` is always a string, even for `type="number"`. Convert it with `Number(ageInput.value)` if you need a number.
5. `innerHTML` renders text as HTML, so user input can inject scripts (XSS). Use `textContent` for plain text.
6. Angle-bracket assertions do not work in `.tsx` files.
7. DOM code needs a browser and `"dom"` in `tsconfig.json` `lib`. It will not run with `ts-node`.