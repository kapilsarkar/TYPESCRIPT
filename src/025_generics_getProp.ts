//025_generics_getProp.ts
 
// ---------------------------------------------------------------
// QUICK DEFINITIONS
// ---------------------------------------------------------------
// Generic <T>       : a placeholder for a type. TypeScript fills it in
//                     based on what you pass (like a variable, but for types).
// keyof T           : a union of all property names of T.
//                     keyof UserN7  ->  'id' | 'name' | 'email' | 'phone'
// K extends keyof T : K must be one of the property names of T.
//                     Passing a wrong key gives a compile error.
// T[K]              : "the type of property K inside T" (indexed access type).
//                     UserN7['name'] -> string
// Optional (?)      : the property may be missing, so its type includes undefined.
//                     UserN7['email'] -> string | undefined
// ---------------------------------------------------------------
 
type UserN7 = {
    id: string
    name: string
    email?: string // T['email'] -> string | undefined
    phone?: number // T['phone'] -> number | undefined
}
 
// ---------------------------------------------------------------
// GETTER: returns the value of one property, with the correct type
// ---------------------------------------------------------------
// T = type of the object, K = a valid key of that object.
// Return type T[K] means: "whatever type that property has".
function getUserPropN7<T, K extends keyof T>(objN7: T, keyN7: K): T[K] {
    return objN7[keyN7]
}
 
const uN7: UserN7 = {
    id: 'u1',
    name: 'kapil',
    phone: 123456789
    // email is optional, so we skipped it
}
 
console.log('--- getUserPropN7 ---')
 
const idValueN7 = getUserPropN7(uN7, 'id') // type: string
console.log('id:', idValueN7) // u1
 
const nameValueN7 = getUserPropN7(uN7, 'name') // type: string
console.log('name:', nameValueN7) // kapil
 
const emailValueN7 = getUserPropN7(uN7, 'email') // type: string | undefined
console.log('email:', emailValueN7) // undefined (we never set it)
 
const phoneValueN7 = getUserPropN7(uN7, 'phone') // type: number | undefined
console.log('phone:', phoneValueN7) // 123456789
 
// Uncomment to see TypeScript block a wrong key:
// getUserPropN7(uN7, 'age') // Error: '"age"' is not assignable to keyof UserN7
 
// ---------------------------------------------------------------
// SETTER: updates one property, and the new value must match its type
// ---------------------------------------------------------------
// newVal : T[K] means the value must have the same type as that property.
// void   : the function does not return anything.
function setUserPropN7<T, K extends keyof T>(
    objN7: T,
    keyN7: K,
    newVal: T[K]
): void {
    objN7[keyN7] = newVal
}
 
console.log('\n--- setUserPropN7 ---')
console.log('Before:', uN7)
 
setUserPropN7(uN7, 'name', 'john') // OK: name is a string
console.log('After name change:', uN7)
 
setUserPropN7(uN7, 'email', 'john@example.com') // OK: email is string | undefined
console.log('After email set:', uN7)
 
setUserPropN7(uN7, 'phone', 987654321) // OK: phone is a number
console.log('After phone change:', uN7)
 
// A function with return type void gives back undefined, so this prints undefined
console.log('Return value of setter:', setUserPropN7(uN7, 'name', 'john'))
 
// Uncomment to see TypeScript block a wrong value type:
// setUserPropN7(uN7, 'phone', 'not-a-number') // Error: string is not assignable to number
// setUserPropN7(uN7, 'age', 25)               // Error: 'age' is not a key of UserN7
 
// Confirm the getter now returns the updated values
console.log('\n--- Final check ---')
console.log('name:', getUserPropN7(uN7, 'name'))   // john
console.log('email:', getUserPropN7(uN7, 'email')) // john@example.com
console.log('phone:', getUserPropN7(uN7, 'phone')) // 987654321

//OutPut
// --- getUserPropN7 ---
// id: u1
// name: kapil
// email: undefined
// phone: 123456789

// --- setUserPropN7 ---
// Before: { id: 'u1', name: 'kapil', phone: 123456789 }
// After name change: { id: 'u1', name: 'john', phone: 123456789 }
// After email set: { id: 'u1', name: 'john', phone: 123456789, email: 'john@example.com' }
// After phone change: { id: 'u1', name: 'john', phone: 987654321, email: 'john@example.com' }
// Return value of setter: undefined

// --- Final check ---
// name: john
// email: john@example.com
// phone: 987654321