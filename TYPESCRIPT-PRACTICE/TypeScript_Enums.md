# Enums: Revision Notes

Revision notes for `enums.ts`.

Run the file with:

```bash
npx ts-node enums.ts
```

---

## What is an enum?

A group of named constants. It is a TypeScript special feature and does not exist in plain JavaScript (the compiler converts it into an object in the JS output).

---

## What the file covers

1. Numeric enum
2. `const enum`
3. Enum as a function parameter type
4. String enum

---

## 1. Numeric enum

Members hold numbers. You can set values yourself. A member with no value auto-increments from the previous one. Without any values, numbering starts at 0.

```typescript
enum Direction {
    UP = 10,
    DOWN = 20,
    LEFT = 30,
    RIGHT,        // 31 (LEFT + 1)
}

console.log(Direction.UP);   // 10
```

---

## 2. `const enum`

Same as an enum, but fully removed at compile time. Usages are replaced by the actual values.

```typescript
const enum Name {
    firstName = "Kapil",
    lastName = "Sarkar"
}

console.log(Name.firstName); // "Kapil"
```

| | `enum` | `const enum` |
|---|--------|--------------|
| Exists at runtime | Yes (object) | No (removed) |
| Can loop over members | Yes | No |
| Output size | Larger | Smaller |

Some setups (such as `isolatedModules` or Babel) do not support `const enum` well. If you get an error, switch to a regular `enum`.

---

## 3. Enum as a parameter type

Restricts a function to valid enum values only. This avoids typos and magic numbers like `10` or `20`.

```typescript
function getUserDirection(direction: Direction): void {
    if (direction === Direction.UP) {
        console.log("You are going UP");
    }
}

getUserDirection(Direction.UP);
```

---

## 4. String enum

Every member must have a string value (no auto-increment). Values are readable in logs and debugging, so they are often preferred for things like statuses.

```typescript
enum OrderStatus {
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED",
    RETURNED = "RETURNED",
    PENDING = "PENDING",
}

console.log(OrderStatus.DELIVERED); // "DELIVERED"
```

---

## Numeric vs String enum

| | Numeric | String |
|---|---------|--------|
| Values | Numbers | Strings |
| Auto-increment | Yes | No |
| Readable in logs | Less (shows 10, 20) | More (shows "DELIVERED") |
| Typical use | Directions, levels | Statuses, roles |

---

## Common mistakes to remember

1. Enums are TypeScript only. They are not part of JavaScript.
2. In a numeric enum, a member without a value continues from the previous number (`RIGHT` becomes 31).
3. In a string enum, every member needs its own value.
4. `const enum` cannot be looped over and may not work in every build setup.
5. Access members as `EnumName.MemberName`, not by writing the raw value.
