# keyof Operator: Revision Notes

Revision notes for `keyof.ts`.

Run the file with:

```bash
npx ts-node keyof.ts
```

---

## What the file covers

1. The `keyof` operator
2. Looping over an object with `for...in`
3. Why `key as UserKeys` is needed
4. An alternative with `Object.entries()`

---

## 1. The `keyof` operator

Creates a **union type of all the property names** of a type.

```typescript
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

type UserKeys = keyof User;
// "id" | "name" | "username" | "email" | "phone" | "website"
```

A variable of type `UserKeys` can only hold one of those exact property names.

---

## 2. Looping with `for...in`

```typescript
for (let key in user) {
    console.log(`${key} : ${user[key as UserKeys]}`);
}
```

Output:

```
id : 1
name : Leanne Graham
username : Bret
...
```

---

## 3. Why `key as UserKeys` is needed

In a `for...in` loop, TypeScript types `key` as a plain `string`, not as one of the `User` keys. So `user[key]` on its own gives this error:

```
Element implicitly has an 'any' type because expression of
type 'string' can't be used to index type 'User'.
```

`key as UserKeys` is a type assertion. It tells TypeScript the key is one of the real property names, which makes `user[key]` valid.

| Code | Works? | Why |
|------|--------|-----|
| `user[key]` | No | `key` is a plain `string` |
| `user[key as UserKeys]` | Yes | `key` is asserted as a valid property name |

---

## 4. Alternative: `Object.entries()`

Gives `[key, value]` pairs directly, so no type assertion is needed.

```typescript
for (const [key, value] of Object.entries(user)) {
    console.log(`${key} : ${value}`);
}
```

---

## Quick reference

| Syntax | Meaning |
|--------|---------|
| `keyof User` | Union of the property names of `User` |
| `key as UserKeys` | Tell TypeScript a string is a valid key |
| `Object.entries(obj)` | Array of `[key, value]` pairs |

---

## Common mistakes to remember

1. `keyof` gives the property **names**, not their values. For the value types, use `User[keyof User]`.
2. In `for...in`, `key` is always a `string`, so it needs a type assertion to index a typed object.
3. A type assertion does not check anything at runtime. It only tells the compiler what to expect.
4. `for...in` also loops over inherited enumerable properties. `Object.entries()` and `Object.keys()` only return the object's own properties.
5. `keyof` only exists at compile time. It is removed when the code is compiled to JavaScript.