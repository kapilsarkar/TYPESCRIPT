# Custom `useFetch` Hook in React + TypeScript

This document explains two versions of a generic data-fetching hook and compares them.

| | File 1: `CustomHook.tsx` | File 2: `useFetch.ts` |
|---|---|---|
| Contains | Hook **and** component in one file | Hook only (reusable) |
| State style | Three separate `useState` calls | One state object |
| Request cancellation | Yes (`AbortController`) | No |
| Cleanup function | Yes | No |
| `finally` block | Yes | No |

---

## Core Idea: What Is a Custom Hook?

A custom hook is a function whose name starts with `use` and that calls other hooks (`useState`, `useEffect`). It lets you reuse stateful logic across components. Here, any component that needs to load data from a URL can call `useFetch` instead of repeating the fetch code.

Both versions return three things:

- `data`: the response, or `null` before it arrives
- `loading`: `true` while the request is running
- `error`: an error message string, or `null`

---

## Understanding the Generic `<T>`

```ts
function useFetch<T>(url: string) { ... }
```

`T` is a **type parameter**. The hook doesn't know what shape of data it will fetch, so the caller says it:

```ts
useFetch<User[]>("https://jsonplaceholder.typicode.com/users");
```

Now `data` is typed `User[] | null`, and TypeScript gives autocomplete on `data?.map((user) => user.name)`.

Note: this only informs TypeScript. It does **not** check the real response at runtime. If the API returns a different shape, TypeScript will not warn you. Libraries like Zod are used for runtime validation.

---

## File 1: `CustomHook.tsx`

### Part 1: The `User` interface

```ts
interface User {
  id: number;
  name: string;
  email: string;
}
```

Describes one user object returned by the API.

### Part 2: The hook

**Three separate states**

```ts
const [data, setData] = useState<T | null>(null);
const [loading, setLoading] = useState<boolean>(true);
const [error, setError] = useState<string | null>(null);
```

Each piece of state is independent and explicitly typed.

**`useEffect` with `[url]`**

The effect runs on mount and again whenever `url` changes.

**`AbortController`**

```ts
const controller = new AbortController();
...
fetch(url, { signal: controller.signal });
...
return () => controller.abort();
```

If the component unmounts, or `url` changes before the request finishes, the cleanup function cancels the old request. This prevents old responses from overwriting newer data and avoids updating state on an unmounted component.

**Checking `response.ok`**

```ts
if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
```

`fetch` only rejects on network failures. A 404 or 500 still resolves, so you must check manually.

**Error handling with `unknown`**

```ts
catch (err: unknown) {
  if (err instanceof Error && err.name !== "AbortError") {
    setError(err.message);
  } else if (!(err instanceof Error)) {
    setError("An unexpected error occurred.");
  }
}
```

- In strict TypeScript, caught errors are `unknown`, so you narrow with `instanceof Error` before reading `.message`.
- `AbortError` is skipped because it comes from our own cancellation, not a real failure.

**`finally`**

```ts
finally { setLoading(false); }
```

Runs after success or failure, so loading always ends.

### Part 3: The component

```tsx
const CustomHook: React.FC = () => { ... }
```

Uses conditional rendering:

- `loading && <p>...</p>` shows a loading message
- `error && <p>...</p>` shows the error in red
- `!loading && !error && (...)` renders the list
- `data?.map(...)` uses optional chaining because `data` may be `null`

Each `<li>` has `key={user.id}` so React can track list items.

### Known issue in File 1

When `url` changes, the old request is aborted. The aborted request still runs its `finally` block, which calls `setLoading(false)`. This can happen **after** the new effect has already called `setLoading(true)`, so the UI may briefly show "not loading" while the new request is still in progress.

A common fix is to skip state updates once the request has been aborted:

```ts
finally {
  if (!controller.signal.aborted) setLoading(false);
}
```

Also, `data` is not cleared when the URL changes, so old data stays visible until new data arrives.

---

## File 2: `useFetch.ts`

### The state shape

```ts
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
```

All three values live in **one** state object. This interface is also the hook's declared return type: `useFetch<T>(url: string): FetchState<T>`.

### How it works

1. `useState<FetchState<T>>` starts with `loading: true`.
2. Inside `useEffect`, an async function `fetchData` is defined and called. (You can't make the effect callback itself `async`, because effects must return nothing or a cleanup function, not a Promise.)
3. It sets a fresh loading state, fetches, checks `response.ok`, and parses JSON as `T`.
4. On success it sets `{ data: result, loading: false, error: null }`.
5. On failure it sets `{ data: null, loading: false, error: message }`.

Because every update replaces the whole object, the three values always stay consistent with each other.

### Limitation of File 2

There is no `AbortController`. If `url` changes quickly (for example while typing in a search box), an older, slower response can arrive last and overwrite the newer result. This is called a **race condition**. The hook also keeps running after unmount and will try to set state.

---

## Which One Should You Use?

The best version combines the strengths of both:

- **From File 2:** a single state object (consistent updates) and a hook in its own file (reusable)
- **From File 1:** `AbortController` with cleanup, and `AbortError` handling

The `useFetch.ts` completed earlier in this conversation does exactly that.

---

## Key Takeaways

- Custom hooks reuse logic; they must start with `use`.
- Generics (`<T>`) let one hook work with any data type.
- Always check `response.ok`; `fetch` does not throw on HTTP errors.
- Catch errors as `unknown` and narrow them before use.
- Cancel in-flight requests in the `useEffect` cleanup to avoid race conditions.
- Put hooks in separate files and keep components focused on rendering.

## Tech Stack

React, TypeScript, Vite