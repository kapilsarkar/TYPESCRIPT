// Topics covered:
// classes, declaring a class, readonly property, class fields,
// public/private modifiers, getters/setters, child class, super,
// protected modifier, abstract class and methods,
// implements interfaces, short syntax for constructor

// ---------------------------------------------------------------
// 1. Declaring a class
// A class is a blueprint for creating objects. Create an object
// (instance) from it with `new`.
// ---------------------------------------------------------------
class Animal {
    // Class fields (properties) with their types.

    // public: accessible from anywhere (default if no modifier is written)
    public name: string;
    public age: number;

    // readonly: can be set only at declaration or inside the constructor,
    // never changed afterwards.
    public readonly species: string;

    // private: accessible only inside this class (not in child classes,
    // not outside). Fields can have a default value.
    private isHungry: boolean = true;

    // protected: accessible inside this class and its child classes,
    // but not from outside.
    protected myProtectedProperty: number = 12;

    // constructor: special method that runs automatically on `new Animal(...)`
    // and sets up the object's initial values.
    constructor(name: string, age: number, species: string) {
        console.log("Constructor called");
        this.name = name;       // `this` refers to the current object
        this.age = age;
        this.species = species;
    }

    // Getter: read like a property (animal.hungerStatus), no brackets.
    // Used to expose a computed value or a private field safely.
    public get hungerStatus(): string {
        return this.isHungry ? `${this.name} is hungry` : `${this.name} is full`;
    }

    // Setter: assign like a property (animal.feed = "bread"), not called
    // like a function. This one has no getter, so it is write-only.
    public set feed(food: string) {
        this.isHungry = false;
        console.log(`${this.name} has been fed with ${food}`);
    }

    public get info(): string {
        return `${this.name} is a ${this.age} year old ${this.species}`;
    }
}

// ---------------------------------------------------------------
// 2. Child class (inheritance)
// `extends` makes Dog inherit all public/protected members of Animal.
// ---------------------------------------------------------------
class Dog extends Animal {
    breed: string;
    skills: string[];

    constructor(name: string, age: number, breed: string, skills: string[]) {
        // super(...) calls the parent constructor. It must run before
        // `this` is used in a child constructor.
        super(name, age, 'Dog');

        // protected members are accessible in a child class.
        console.log(this.myProtectedProperty);

        this.breed = breed;
        this.skills = skills;
    }
}

const myNewClassDog = new Dog('tom', 10, 'greyhound', ['sit', 'come']);
console.log(myNewClassDog);
console.log(myNewClassDog.hungerStatus);
myNewClassDog.feed = "bread"; // calls the setter
console.log(myNewClassDog.hungerStatus);
console.log(myNewClassDog);

// ---------------------------------------------------------------
// 3. Creating objects (instances)
// Each `new Animal(...)` creates a separate object.
// ---------------------------------------------------------------
const tom = new Animal("Tom", 10, "Dog");
const tony = new Animal("Tony", 12, "Dog");
console.log(tom);
tom.name = "tony"; // allowed: name is public and not readonly
console.log(tony);
console.log(tony.hungerStatus);
// tony.feed("bread"); // Error: feed is a setter, not a method
tony.feed = "bread";
console.log(tony.hungerStatus);

console.log(tom.info);
// tom.species = "lion"; // Error: Cannot assign to 'species' because it is a read-only property.
// tom.isHungry;         // Error: 'isHungry' is private.

// ---------------------------------------------------------------
// 4. Interface to implement
// An interface is a contract: a class that `implements` it must
// provide every member listed here.
// ---------------------------------------------------------------
interface Flyable {
    fly(): string;
}

// ---------------------------------------------------------------
// 5. Abstract class and abstract method
// An abstract class cannot be instantiated directly (new Birds() is
// an error). It is a base class meant to be extended.
// An abstract method has no body; every child class MUST implement it.
// ---------------------------------------------------------------
abstract class Birds {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    // No body here: child classes provide the implementation.
    abstract makeSound(): string;

    // A normal (concrete) method can exist in an abstract class and
    // is inherited as is. It can call the abstract method.
    public describe(): string {
        return `${this.name} says: ${this.makeSound()}`;
    }
}

// `extends` inherits from the abstract class,
// `implements` promises to follow the Flyable interface.
class Parrot extends Birds implements Flyable {
    makeSound(): string {
        return `${this.name} is chanting`;
    }

    fly(): string {
        return `${this.name} is flying`;
    }
}

// const bird = new Birds("x"); // Error: Cannot create an instance of an abstract class.
const polly = new Parrot("Polly");
console.log(polly.makeSound());
console.log(polly.describe());
console.log(polly.fly());

// ---------------------------------------------------------------
// 6. Short syntax for the constructor (parameter properties)
// Adding a modifier (public, private, protected, readonly) to a
// constructor parameter declares the field AND assigns it
// automatically. No separate field or this.x = x lines needed.
// ---------------------------------------------------------------
class Cat {
    constructor(
        public name: string,
        private age: number,
        public readonly species: string = "Cat"
    ) {}
}

const kitty = new Cat("Kitty", 3);
console.log(kitty);