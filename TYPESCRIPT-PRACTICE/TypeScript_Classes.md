# Classes: Revision Notes

Revision notes for `classes.ts`.

Run the file with:

```bash
npx ts-node classes.ts
```

---

## What the file covers

1. Declaring a class, fields, constructor
2. Access modifiers (`public`, `private`, `protected`) and `readonly`
3. Getters and setters
4. Child class (`extends`, `super`)
5. Interface (`implements`)
6. Abstract class and abstract method
7. Short constructor syntax (parameter properties)

---

## 1. Declaring a class

A class is a blueprint for creating objects. Create an object (instance) with `new`.

```typescript
class Animal {
    public name: string;
    public age: number;
    public readonly species: string;

    constructor(name: string, age: number, species: string) {
        this.name = name;
        this.age = age;
        this.species = species;
    }
}

const tom = new Animal("Tom", 10, "Dog");
```

- **Fields**: the properties of the class, with their types.
- **Constructor**: runs automatically on `new` and sets the starting values.
- **`this`**: refers to the current object.

---

## 2. Access modifiers and `readonly`

| Modifier | Inside class | Child class | Outside |
|----------|--------------|-------------|---------|
| `public` (default) | Yes | Yes | Yes |
| `protected` | Yes | Yes | No |
| `private` | Yes | No | No |

`readonly`: can be set only at declaration or inside the constructor, never changed afterwards.

```typescript
// tom.species = "lion";  // Error: read-only property
// tom.isHungry;          // Error: 'isHungry' is private
```

---

## 3. Getters and setters

| | Getter | Setter |
|---|--------|--------|
| Keyword | `get` | `set` |
| Used like | `animal.info` | `animal.feed = "bread"` |
| Brackets needed | No | No (it is an assignment) |

```typescript
public get hungerStatus(): string {
    return this.isHungry ? `${this.name} is hungry` : `${this.name} is full`;
}

public set feed(food: string) {
    this.isHungry = false;
}

tony.feed = "bread";      // correct
// tony.feed("bread");    // Error: feed is a setter, not a method
```

A setter without a getter is write-only.

---

## 4. Child class (`extends`, `super`)

The child class inherits all `public` and `protected` members of the parent.

```typescript
class Dog extends Animal {
    breed: string;

    constructor(name: string, age: number, breed: string) {
        super(name, age, 'Dog');   // calls the parent constructor
        this.breed = breed;
    }
}
```

`super(...)` must run before `this` is used in a child constructor.

---

## 5. Interface (`implements`)

An interface is a contract. A class that `implements` it must provide every member listed.

```typescript
interface Flyable {
    fly(): string;
}

class Parrot extends Birds implements Flyable {
    fly(): string { return `${this.name} is flying`; }
}
```

| | `extends` | `implements` |
|---|-----------|--------------|
| Used with | A class | An interface |
| Gives | Inherited code | A contract to follow |
| How many | One class only | Many interfaces |

---

## 6. Abstract class and abstract method

- An **abstract class** cannot be instantiated directly. It is a base class meant to be extended.
- An **abstract method** has no body. Every child class **must** implement it.
- An abstract class can also have normal methods, which children inherit.

```typescript
abstract class Birds {
    constructor(public name: string) {}

    abstract makeSound(): string;       // no body

    public describe(): string {         // normal method
        return `${this.name} says: ${this.makeSound()}`;
    }
}

class Parrot extends Birds {
    makeSound(): string { return `${this.name} is chanting`; }
}

// new Birds("x");   // Error: cannot create an instance of an abstract class
```

---

## 7. Short constructor syntax (parameter properties)

A modifier on a constructor parameter declares the field **and** assigns it automatically.

```typescript
// Long way
class Cat {
    public name: string;
    constructor(name: string) { this.name = name; }
}

// Short way
class Cat {
    constructor(public name: string, private age: number) {}
}
```

---

## Common mistakes to remember

1. An abstract method must be declared **inside** an abstract class, and it has no body.
2. A class cannot have an abstract method and a normal method with the same name.
3. A setter is assigned (`obj.feed = "x"`), not called (`obj.feed("x")`).
4. `super(...)` must be called before `this` in a child constructor.
5. `private` fields are not accessible in child classes. Use `protected` if children need access.
6. With `strict` mode, every field needs a value: set it in the constructor or give it a default.
7. `readonly` can only be assigned in the constructor or at declaration.
8. A class can extend only one class, but can implement many interfaces.