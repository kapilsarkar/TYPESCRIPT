# Fetching Data with Generics: Revision Notes

Revision notes for `fetch-generics-simple.ts`.

Run the file with:

```bash
npx ts-node fetch-generics-simple.ts
```

Needs Node 18+ (fetch is built in) or a browser. If TypeScript cannot find `fetch`, install `@types/node` or add `"dom"` to `lib` in `tsconfig.json`.

---

## What the file covers

1. Interfaces describing API data
2. A reusable generic fetch function
3. `async` / `await`
4. Error handling with `try` / `catch`
5. Using the function with different types

---

## 1. Interfaces describe the data

Each interface describes the shape of one item returned by an API.

```typescript
interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}
```

---

## 2. Generic fetch function

One reusable function that works for **any** list of data.

```typescript
async function fetchList<T>(url: string): Promise<T[]> {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }

    const data: T[] = await response.json();
    return data;
}
```

| Part | Meaning |
|------|---------|
| `<T>` | Type of one item (`Todo`, `Post`, ...) |
| `Promise<T[]>` | "Later, you will get an array of T" |
| `response.ok` | `false` for errors like 404 or 500 |
| `response.json()` | Turns the response into JavaScript data |

---

## 3. `async` / `await`

- `async` marks a function that works with promises. It always returns a promise.
- `await` pauses until the promise finishes, so the code reads top to bottom like normal code.
- `await` can only be used inside an `async` function.

| | `.then()` chain | `async` / `await` |
|---|-----------------|-------------------|
| Reads | Nested callbacks | Top to bottom |
| Error handling | `.catch()` | `try` / `catch` |
| Beginner friendly | Less | More |

---

## 4. Error handling

```typescript
try {
    const todos = await fetchList<Todo>(todosUrl);
    // ...
} catch (error) {
    console.log("Something went wrong:", error);
}
```

`catch` runs if the request fails or an error is thrown (for example when `response.ok` is `false`).

---

## 5. Using the function

Pass the item type in `<>`. TypeScript then knows exactly which properties each item has.

```typescript
const todos = await fetchList<Todo>(todosUrl);
const todoTitles = todos.map(todo => todo.title);      // todo.title is checked

const posts = await fetchList<Post>(postsUrl);
const postBodies = posts.map(post => post.body);       // post.body is checked
```

`.slice(0, 5)` is used when logging to show only the first 5 items, because the todos API returns 200 items and the posts API 100.

---

## Common mistakes to remember

1. `await` only works inside an `async` function.
2. `fetch` does not throw on 404 or 500. Always check `response.ok` yourself.
3. The generic type is only a label for TypeScript. It does not check the real data, so the API response must actually match the interface.
4. Without `try` / `catch` (or `.catch()`), a failed request causes an unhandled promise rejection.
5. Forgetting `await` gives you a `Promise` instead of the data.
6. `fetch` needs Node 18+ or a browser.