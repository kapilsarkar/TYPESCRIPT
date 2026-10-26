// ---------------------------------------------------------------
// Utility types
// Built-in TypeScript tools that create a NEW type from an
// existing one, so you don't have to rewrite it.
// ---------------------------------------------------------------

// ---------------------------------------------------------------
// 1. Interfaces
// Interfaces can be used before they are written in the file, so
// Address can use Geo even though Geo is declared below it.
// Nested interfaces describe nested objects.
// ---------------------------------------------------------------
interface Address {
    street: string;
    city: string;
    suite: string;
    zipCode: string;
    geo: Geo;
}

interface Geo {
    lat: string;
    lng: string;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

const user: User = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz",
    address: {
        street: "Kulas Light",
        suite: "Apt. 556",
        city: "Gwenborough",
        zipCode: "92998-3874",
        geo: {
            lat: "-37.3159",
            lng: "81.1496"
        }
    },
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: {
        name: "Romaguera-Crona",
        catchPhrase: "Multi-layered client-server neural-net",
        bs: "harness real-time e-markets"
    },
};

console.log(user);

// ---------------------------------------------------------------
// 2. Partial<T>
// Makes ALL properties optional. Useful for updates where only
// some fields are sent.
// ---------------------------------------------------------------
type PartialUser = Partial<User>;

const partialUser: PartialUser = {
    id: 1,
    name: "myname",
};

console.log(partialUser);

// Real use of Partial: a function that updates only some fields.
// The spread (...) copies the old user, then `updates` overwrite
// matching fields. The original user is not changed.
function updateUser(current: User, updates: Partial<User>): User {
    return { ...current, ...updates };
}

const updatedUser = updateUser(user, { name: "Kapil Sarkar", phone: "123-456" });
console.log(updatedUser.name);  // "Kapil Sarkar"
console.log(user.name);         // "Leanne Graham" (original unchanged)

// ---------------------------------------------------------------
// 3. Required<T>
// Makes ALL properties required (the opposite of Partial).
// Every field in User is already required, so Required<User> is
// the same as User. Required only changes types that have
// optional (?) properties, as in the Settings example below.
// ---------------------------------------------------------------
type StrictUser = Required<User>;

// The user object can be reused here because the types match.
const user2: StrictUser = user;
console.log(user2);

type Settings = {
    theme?: string;
    fontSize?: number;
};

type FullSettings = Required<Settings>;

const settings: FullSettings = { theme: "dark", fontSize: 14 };
console.log(settings);
// const badSettings: FullSettings = { theme: "dark" }; // Error: 'fontSize' is missing

// ---------------------------------------------------------------
// 4. Readonly<T>
// Makes ALL properties read-only (cannot be reassigned).
// Note: it is shallow. Only the top-level properties are locked.
// ---------------------------------------------------------------
type ReadonlyUser = Readonly<User>;

const user3: ReadonlyUser = user;
console.log(user3.name);

// user3.name = "Kapil";
// Error: Cannot assign to 'name' because it is a read-only property.

// user3.address.city = "Kolkata";
// NOT an error: address itself is an object whose properties are
// still editable, because Readonly does not go deeper.

// ---------------------------------------------------------------
// 5. Pick<T, Keys>
// Creates a new type with ONLY the chosen properties.
// ---------------------------------------------------------------
type UserSummary = Pick<User, "id" | "name" | "email">;

// Helper that builds a summary from a full user.
function getUserSummary(u: User): UserSummary {
    return { id: u.id, name: u.name, email: u.email };
}

console.log(getUserSummary(user)); // { id: 1, name: "Leanne Graham", email: "Sincere@april.biz" }

// ---------------------------------------------------------------
// 6. Omit<T, Keys>
// Creates a new type with every property EXCEPT the chosen ones
// (the opposite of Pick).
// ---------------------------------------------------------------
type BasicUser = Omit<User, "address" | "company">;

const basicUser: BasicUser = {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
};

console.log(basicUser);

// ---------------------------------------------------------------
// 7. Record<Keys, Type>
// Creates an object type with a set of keys, all having the same
// value type. Handy for lookups, e.g. users by id.
// ---------------------------------------------------------------
type UsersById = Record<number, User>;

const usersById: UsersById = {
    1: user,
};

console.log(usersById[1].name); // "Leanne Graham"

// Keys can also be a fixed set of strings; every key must be present.
type Role = "admin" | "editor" | "viewer";
const permissions: Record<Role, string[]> = {
    admin: ["read", "write", "delete"],
    editor: ["read", "write"],
    viewer: ["read"],
};

console.log(permissions.editor); // ["read", "write"]

// ---------------------------------------------------------------
// Quick reference
//   Partial<T>      all properties optional
//   Required<T>     all properties required
//   Readonly<T>     all properties read-only (shallow)
//   Pick<T, K>      keep only the chosen properties
//   Omit<T, K>      remove the chosen properties
//   Record<K, V>    object with keys K and values V
// ---------------------------------------------------------------