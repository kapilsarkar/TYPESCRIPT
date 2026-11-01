# React + TypeScript Basics: Chai App

A small practice project for learning **React with TypeScript**. It shows how to type props, state, and shared data models in a simple "chai menu" UI.

## What I Learned

- Typing **props** with `interface`
- Optional props (`isSpecial?: boolean`) with default values
- Typing **state** with `useState<number>(0)`
- Sharing types across files with `export interface` and `import type`
- Typing arrays of objects (`Chai[]`)
- Rendering lists with `.map()` and `key`
- Passing a computed value as a prop (`isSpecial={chai.price > 30}`)
- Typing **forms and events** (`React.FormEvent`, `React.ChangeEvent`)
- Typing a **callback prop** (`onSubmit`) so a child can send data to its parent
- Controlled inputs: the input's value lives in React state
- Typing **children** with `PropsWithChildren` and other renderable content with `ReactNode`
- Extending a props interface with `extends`
- Conditional rendering of an optional prop (`footer && <footer>...`)

## Project Structure

```
src/
├── App.tsx                 # Root component, holds the menu data
├── App.css
├── types.ts                # Shared Chai type
└── components/
    ├── ChaiCard.tsx        # Displays one item (name, price, optional star)
    ├── ChaiList.tsx        # Renders a list of ChaiCard components
    ├── OrderForm.tsx       # Typed form with controlled inputs
    ├── Card.tsx            # Reusable wrapper with children and optional footer
    └── Counter.tsx         # Typed useState example
```

## Components

### `types.ts`
Defines the shape of one menu item. Other files import it with `import type`.

```ts
export interface Chai {
  id: number;
  name: string;
  price: number;
}
```

### `ChaiCard.tsx`
Receives `name` and `price`, plus an optional `isSpecial` flag (defaults to `false`). Shows a ⭐ when the item is special.

```tsx
interface ChaiCardProp {
  name: string;
  price: number;
  isSpecial?: boolean;
}
```

### `ChaiList.tsx`
Takes `items: Chai[]` and renders one `ChaiCard` per item. Items priced above 30 are marked special.

### `Counter.tsx`
A counter using `useState<number>(0)`. The button uses the functional update form `setCount((c) => c + 1)`.

### `OrderForm.tsx`
A form where the user types a chai name and a number of cups. When submitted, it sends the order up to the parent through a callback prop.

```tsx
interface OrderFormProps {
  onSubmit(order: { name: string; cups: number }): void;
}
```

**How it works**

1. **Callback prop.** `onSubmit` is a function the parent passes in. The child calls it with the order data. This is how a child component sends data *up* to its parent.
2. **Typed state.** `useState<string>("Masala")` holds the name and `useState<number>(1)` holds the cups.
3. **Controlled inputs.** Each input has `value={...}` and an `onChange` that updates state, so React state is the single source of truth.
4. **Event types.**
   - `React.FormEvent<HTMLFormElement>` for the form's submit event
   - `React.ChangeEvent<HTMLInputElement>` for input changes
   - The generic part (`HTMLFormElement`, `HTMLInputElement`) tells TypeScript which element fired the event, so `e.target.value` is typed correctly.
5. **`e.preventDefault()`** stops the browser from reloading the page on submit.
6. **`Number(e.target.value) || 0`** converts the input text to a number. Input values are always strings, even for `type="number"`. The `|| 0` turns an empty field (`NaN`) into `0`.

**Using it in `App.tsx`**

```tsx
<OrderForm
  onSubmit={(order) => {
    console.log("Placed:", order.name, order.cups);
  }}
/>
```

TypeScript infers `order` from the prop type, so `order.name` is a `string` and `order.cups` is a `number` with no extra annotation.

**Suggested improvements**

- Move the order shape into `types.ts` so it is reused and not repeated:
  ```ts
  export interface Order {
    name: string;
    cups: number;
  }
  ```
  then use `onSubmit: (order: Order) => void;`
- Prefer the property style `onSubmit: (order: Order) => void` over the method style `onSubmit(order): void`. Both work, but the property style is stricter and more common.
- Import the event types so you don't rely on the global `React` namespace:
  ```ts
  import { useState, type FormEvent, type ChangeEvent } from "react";
  ```
- Link labels to inputs for accessibility: `<label htmlFor="name">` with `<input id="name" />`.
- Add `min={1}` to the cups input to block zero or negative orders.

### `Card.tsx`
A reusable wrapper component. It shows a title, whatever content is placed inside it (`children`), and an optional footer.

```tsx
import type { PropsWithChildren, ReactNode } from "react";

interface CardProps extends PropsWithChildren {
  title: string;
  footer?: ReactNode;
}
```

**How it works**

1. **`PropsWithChildren`** is a built-in React type that adds an optional `children` prop. Extending it means `Card` can wrap other elements:
   ```tsx
   <Card title="Menu"><p>Hello</p></Card>
   ```
2. **`interface CardProps extends PropsWithChildren`** reuses that type and adds `title` and `footer` on top. `extends` copies all properties of the parent type into the new interface.
3. **`ReactNode`** is the type for anything React can render: strings, numbers, JSX elements, arrays, `null`. It is the right type for `footer`, because the caller might pass text or a whole button.
4. **`footer?`** is optional, so `Card` works with or without it.
5. **`{footer && <footer>{footer}</footer>}`** is conditional rendering. If `footer` is not provided, nothing is rendered.
6. **`import type`** imports the types only. They are removed at build time.

**Using it in `App.tsx`**

```tsx
<Card title="Chai Or TypeScript" footer={<button>Order Now</button>} />
```

Here `title` is required, and `footer` receives a JSX element.

**Notes and suggested improvements**

- In the usage above, no children are passed, so the empty `<div>{children}</div>` renders nothing. To see `children` working, place content between the tags:
  ```tsx
  <Card title="Chai Or TypeScript" footer={<button>Order Now</button>}>
    <p>Fresh and hot</p>
  </Card>
  ```
- The hardcoded `<h3>Card</h3>` will repeat on every card. Remove it, or turn it into a prop if you need a label.
- If you want `children` to be required, declare it directly instead: `children: ReactNode;`.
- Newer React type versions allow `PropsWithChildren` with no type argument, as you wrote. In older versions you may need `PropsWithChildren<{}>`, or write `children?: ReactNode` yourself.

### `App.tsx`
Defines the `menu` array typed as `Chai[]` and composes everything together.

## Key Concepts

| Concept | Example | Why it matters |
|---|---|---|
| Props interface | `interface ChaiCardProp {...}` | TypeScript checks every prop passed in |
| Optional prop | `isSpecial?: boolean` | Caller may skip it; default value fills in |
| Typed state | `useState<number>(0)` | `setCount` only accepts numbers |
| Type import | `import type { Chai }` | Erased at build time, no runtime cost |
| Array typing | `const menu: Chai[]` | Every object must match `Chai` |
| Callback prop | `onSubmit(order): void` | Child sends data up to the parent |
| Form event | `React.FormEvent<HTMLFormElement>` | Types the submit event |
| Change event | `React.ChangeEvent<HTMLInputElement>` | Types `e.target.value` |
| Controlled input | `value={name}` + `onChange` | React state drives the input |
| Children prop | `extends PropsWithChildren` | Lets a component wrap other elements |
| Renderable content | `footer?: ReactNode` | Accepts text, JSX, or nothing |
| Interface extension | `interface A extends B` | Reuse and build on existing types |

## Run Locally

```bash
npm install
npm run dev
```

## Possible Next Steps

- Give each menu item a unique `id`
- Use `Chai` props directly in `ChaiCard` (e.g. `Omit<Chai, "id">`)
- Extract an `Order` type into `types.ts` and store submitted orders in state
- Make `Card` wrap real content, such as a `ChaiList`, via `children`
- Add typed `useReducer` and custom hooks
- Fetch menu data from an API and type the response

## Tech Stack

React, TypeScript, Vite