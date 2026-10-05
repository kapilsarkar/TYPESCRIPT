// 026_shallow_util_object.ts
// Topic: TypeScript Utility Types (Partial, Required, Readonly, Pick, Omit, Record)
//
// Utility types = built-in helpers that TRANSFORM an existing type into a new one,
// so we don't have to rewrite the same shape again and again.
// NOTE: They are "shallow" -> they only affect TOP-LEVEL fields, not nested objects.
// NOTE: Types exist only at compile time. At runtime (console.log) they are gone.

// ---------------------------------------------------------------------------
// Base types used in all examples below
// ---------------------------------------------------------------------------

// Nested object type (used inside User10 as `address`)
type AddressNR = {
    line1: string;
    city: string;
};

// Main type. `email` is optional (the `?` means it may be missing).
type User10 = {
    id: string;
    name: string;
    email?: string;
    address: AddressNR;
};

// ---------------------------------------------------------------------------
// 1) Partial<T>
// Definition: makes ALL top-level fields optional.
// Use case  : update/patch operations where only some fields are sent.
// ---------------------------------------------------------------------------

type UserPatch10 = Partial<User10>;

const patch10: UserPatch10 = { name: 'kapil' };
const patch11: UserPatch10 = { address: { line1: 'line1', city: 'city' } };

console.log('--- 1) Partial<User10> ---');
console.log('patch10 (only name):', patch10);
console.log('patch11 (only address):', patch11);

// ---------------------------------------------------------------------------
// 2) Required<T>
// Definition: makes ALL top-level fields required (removes the `?`).
// Use case  : when you must guarantee every field (even optional ones) exists.
// ---------------------------------------------------------------------------

type UserAllRequiredN10 = Required<User10>;

const userAllPatch11: UserAllRequiredN10 = {
    id: 'u2',
    name: 'name2',
    address: { line1: 'line2', city: 'Kolkata' },
    email: 'kapi@gmail.com', // now compulsory, TS errors if we remove it
};

console.log('\n--- 2) Required<User10> ---');
console.log('userAllPatch11 (email is now mandatory):', userAllPatch11);

// ---------------------------------------------------------------------------
// 3) Readonly<T>
// Definition: makes ALL top-level fields read-only (cannot be reassigned).
// Use case  : immutable data, config objects, state you don't want modified.
// Shallow warning: `address.city` can still be changed, only `address` itself
// cannot be reassigned.
// ---------------------------------------------------------------------------

type ReadOnlyUserN10 = Readonly<User10>;

const readOnlyUser: ReadOnlyUserN10 = {
    id: 'n3',
    name: 'john',
    address: {
        line1: 'line3',
        city: 'America',
    },
};

// Error: Cannot assign to 'name' because it is a read-only property
// readOnlyUser.name = 'this';

// Allowed, because Readonly is SHALLOW (nested object is still editable)
readOnlyUser.address.city = 'Canada';

console.log('\n--- 3) Readonly<User10> ---');
console.log('readOnlyUser:', readOnlyUser);
console.log('Nested field changed (shallow readonly):', readOnlyUser.address.city);

// ---------------------------------------------------------------------------
// 4) Pick<T, K>
// Definition: creates a new type with ONLY the selected keys.
// Use case  : exposing only safe/public fields (e.g. API response).
// ---------------------------------------------------------------------------

type PublicUserN10 = Pick<User10, 'id' | 'name'>;

const publicUser: PublicUserN10 = { id: 'u5', name: 'BrockLesnar' };

console.log('\n--- 4) Pick<User10, "id" | "name"> ---');
console.log('publicUser (only id & name):', publicUser);

// ---------------------------------------------------------------------------
// 5) Omit<T, K>
// Definition: creates a new type with everything EXCEPT the given keys.
// Use case  : opposite of Pick, e.g. remove sensitive/unwanted fields.
// ---------------------------------------------------------------------------

type UserWithoutEmailN10 = Omit<User10, 'email'>;

const omitUserN10: UserWithoutEmailN10 = {
    id: 'u4',
    name: 'Virat Kohli',
    address: {
        line1: 'd',
        city: 'Delhi',
    },
};

// Error: Property 'email' does not exist on type 'UserWithoutEmailN10'
// omitUserN10.email = 'that';

console.log('\n--- 5) Omit<User10, "email"> ---');
console.log('omitUserN10 (no email field):', omitUserN10);
console.log('Has email key?', 'email' in omitUserN10);

// ---------------------------------------------------------------------------
// 6) Record<K, V>
// Definition: creates an object type whose keys are K and every value is type V.
// Use case  : lookup tables / dictionaries with a fixed set of keys.
// ---------------------------------------------------------------------------

// Union of allowed keys
type RoleK = 'admin' | 'user' | 'editor';

// Every role key MUST exist and each value must be a User10
type RoleCheck = Record<RoleK, User10>;

const dirN10: RoleCheck = {
    admin: {
        id: 'u10',
        name: 'admin',
        address: { line1: 'line1', city: 'Australia' },
    },
    user: {
        id: 'u11',
        name: 'user',
        address: { line1: 'line1', city: 'China' },
    },
    editor: {
        id: 'u12',
        name: 'editor',
        address: { line1: 'line1', city: 'Japan' },
    },
};

console.log('\n--- 6) Record<RoleK, User10> ---');
console.log('Full directory:', dirN10);
console.log('Admin city:', dirN10.admin.address.city);

// Loop through all roles (Object.keys returns string[], so we cast to RoleK[])
(Object.keys(dirN10) as RoleK[]).forEach((role) => {
    console.log(`Role: ${role} -> Name: ${dirN10[role].name}, City: ${dirN10[role].address.city}`);
});