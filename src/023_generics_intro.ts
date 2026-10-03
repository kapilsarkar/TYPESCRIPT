// 023_generics_intro.ts

/*
  GENERIC = one function/type that works for many types, without losing type info.

  <T> = type parameter (a "blank" type name you pick when you call the function).
  TypeScript usually fills in T for you (inference) from the argument you pass.

  Compare:
    (x: unknown) => unknown  → you lose the specific type
    <T>(x: T) => T            → input and output stay the same type
*/

// --- id: simplest generic ---

function id<T>(x: T): T {
  return x
}

// T is inferred: id(5) → T = number, id('kapil') → T = string
// You can also write it yourself: id<number>(5)

const numFromId = id(5)
const strFromId = id('kapil')
const arrFromId = id(['kapil', 'sarkar'])
const explicitNum = id<number>(5)

console.log('--- id<T> (inference + explicit <number>) ---')
console.log('numFromId:', numFromId, '→ numFromId + 1 =', numFromId + 1)
console.log('strFromId:', strFromId)
console.log('arrFromId:', arrFromId)
console.log('explicitNum (id<number>(5)):', explicitNum)

// --- firstGen: T[] means "array of whatever T is" ---

function firstGen<T>(arr: T[]): T | undefined {
  return arr[0] // first item; undefined if array is empty
}

const firstNumber = firstGen([1, 2, 3, 4, 5])
const firstName = firstGen(['kapil', 'sarkar'])
const firstEmpty = firstGen<number>([])

console.log('\n--- firstGen<T>(arr: T[]) ---')
console.log('firstNumber (T = number):', firstNumber)
console.log('firstName (T = string):', firstName)
console.log('firstEmpty (empty array):', firstEmpty)

// --- wrap: generic in the return type too ---

function wrap<T>(value: T): { value: T } {
  return { value }
}

const wrappedNum = wrap(42)
const wrappedUser = wrap({ name: 'Kapil', role: 'Admin' as const })

console.log('\n--- wrap<T> (keeps exact type in { value: T }) ---')
console.log('wrappedNum:', wrappedNum)
console.log('wrappedNum.value + 1:', wrappedNum.value + 1)
console.log('wrappedUser:', wrappedUser)
console.log('wrappedUser.value.name:', wrappedUser.value.name)
