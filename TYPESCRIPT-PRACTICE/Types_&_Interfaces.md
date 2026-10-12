# Types and Interfaces: Revision Notes

Revision notes for `types-and-interfaces.ts`.

Run the file with:

```bash
npx ts-node types-and-interfaces.ts
```

---

## What the file covers

1. `type` alias with an optional property
2. `interface` and declaration merging
3. Interface extension (`extends`)
4. Type extension (intersection `&`)

---

## 1. Type alias

Gives a name to an object shape. `?` makes a property optional.

```typescript
type Person = {
    firstName: string;
    lastName: string;
    age?: number; // Optional
}

const person: Person = { firstName: "Kapil", lastName: "Sarkar", age: 34 };
```

---

## 2. Interface

Another way to describe an object shape.

```typescript
export interface Member {
    Member1: string;
    Member2: string;
    income?: number; // Optional
}
```

### Declaration merging

An interface can be declared again with the same name. TypeScript merges all declarations into one.

```typescript
export interface Member {
    address?: { country: string; pinCode: number; houseNumber: number; city: string; state: string };
    contactNumber?: string;
}
// Member now has: Member1, Member2, income?, address?, contactNumber?
```

---

## 3. `type` vs `interface`

| | `type` | `interface` |
|---|--------|-------------|
| Describes object shape | Yes | Yes |
| Can be redeclared (merged) | No, duplicate name error | Yes, declarations merge |
| Extends using | `&` (intersection) | `extends` |
| Can describe unions / primitives | Yes | No |

---

## 4. Interface extension (`extends`)

The child interface inherits everything from the parent and adds its own properties.

```typescript
interface A { prop1: string; }
interface B extends A { prop2: string; }

const obj: B = { prop1: "Cricket", prop2: "WWE" };
```

Extending the merged `Member` interface:

```typescript
interface MemberWithIncome extends Member {
    income: number; // optional in Member, required here
}
```

A new name is required. Reusing `Member` would merge into it instead of extending it.

---

## 5. Type extension (intersection `&`)

Combines an existing type with extra properties into a new type.

```typescript
type FamilyMember = Member & {
    familyLanguage: string;
}
```

---

## Common mistakes to remember

1. `"string"` (in quotes) is a literal type, not the `string` type. Write `familyLanguage: string`.
2. A `type` and an `interface` cannot share the same name in one scope.
3. Re-declaring an interface merges it; it does not extend it. Use `extends` with a new name.
4. Property names are case-sensitive: `Income` and `income` are different properties.
5. Do not import a file into itself. If `Member` is declared in the same file, use it directly.