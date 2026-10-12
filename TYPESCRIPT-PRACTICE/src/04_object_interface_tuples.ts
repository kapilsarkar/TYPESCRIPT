// ---------------------------------------------------------------
// 1. type alias
// Gives a name to an object shape (or any type).
// `?` makes a property optional.
// ---------------------------------------------------------------
type Person = {
    firstName: string;
    lastName: string;
    age?: number; // Optional
}

const person: Person = {
    firstName: "Kapil",
    lastName: "Sarkar",
    age: 34,
}

console.log(person)

// ---------------------------------------------------------------
// 2. interface
// Another way to describe an object shape.
// ---------------------------------------------------------------
export interface Member {
    Member1: string;
    Member2: string;
    income?: number; // Optional
}

// types vs interface:
//   - A type alias cannot be redeclared (duplicate name = error).
//   - An interface CAN be redeclared; TypeScript merges all the
//     declarations into one (declaration merging).
export interface Member {
    address?: {
        country: string;
        pinCode: number;
        houseNumber: number;
        city: string;
        state: string;
    };

    contactNumber?: string;
}

// ---------------------------------------------------------------
// 3. Interface extension (extends)
// B inherits everything from A and adds its own property.
// ---------------------------------------------------------------
interface A {
    prop1: string;
}

interface B extends A {
    prop2: string;
}

const obj: B = {
    prop1: "Cricket",
    prop2: "WWE",
}
console.log(obj)

// Extending the merged Member interface. A new name is required:
// reusing "Member" would merge into it instead of extending it.
// `income` was optional in Member; here it becomes required.
interface MemberWithIncome extends Member {
    income: number;
}

const member: MemberWithIncome = {
    Member1: "Kapil Sarkar",
    Member2: "Virat kholi",
    address: {
        country: "India",
        pinCode: 713328,
        houseNumber: 2,
        city: "Asansol",
        state: "West Bengal",
    },
    income: 5500000,
}

console.log(member)

// ---------------------------------------------------------------
// 4. Object extension with a type (intersection &)
// Combines Member with extra properties into one new type.
// A type alias needs its own unique name too.
// ---------------------------------------------------------------
type FamilyMember = Member & {
    familyLanguage: string;
}

const familyMember: FamilyMember = {
    Member1: "Kapil Sarkar",
    Member2: "Virat kholi",
    familyLanguage: "Bengali",
}

console.log(familyMember)