// ---------------------------------------------------------------
// keyof operator
// Creates a union type of all the property NAMES of a type.
// ---------------------------------------------------------------
type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
}

const user: User = {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "kyx@gmail.com",
    phone: "121355-23435353",
    website: "abcde.com",
}

// keyof User = "id" | "name" | "username" | "email" | "phone" | "website"
type UserKeys = keyof User;

// ---------------------------------------------------------------
// Looping over an object's keys with for...in
// In a for...in loop, TypeScript types `key` as a plain string,
// not as one of the User keys. So user[key] gives an error:
//   Element implicitly has an 'any' type because expression of
//   type 'string' can't be used to index type 'User'.
// `key as UserKeys` is a type assertion that tells TypeScript
// the key is one of the real property names, which makes
// user[key] valid.
// ---------------------------------------------------------------
for (let key in user) {
    console.log(`${key} : ${user[key as UserKeys]}`);
}

// Alternative without a type assertion:
// Object.entries() gives [key, value] pairs directly.
// for (const [key, value] of Object.entries(user)) {
//     console.log(`${key} : ${value}`);
// }