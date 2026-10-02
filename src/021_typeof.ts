//021_typeof.ts

// typeof for primitives (and null / object / function)
function describeTypeOf(x: unknown): string {
  if (typeof x === 'string') {
    return 'string'
  }
  if (typeof x === 'number') {
    return 'number'
  }
  if (typeof x === 'boolean') {
    return 'boolean'
  }
  if (typeof x === 'bigint') {
    return 'bigint'
  }
  if (typeof x === 'symbol') {
    return 'symbol'
  }
  if (typeof x === 'undefined') {
    return 'undefined'
  }
  if (typeof x === 'function') {
    return 'function'
  }

  // typeof null === 'object' — must check null explicitly
  if (x === null) return 'null'

  return 'object'
}

console.log('--- describeTypeOf ---')
console.log('string:   ', describeTypeOf('hi'))
console.log('number:   ', describeTypeOf(23))
console.log('boolean:  ', describeTypeOf(true))
console.log('bigint:   ', describeTypeOf(10n))
console.log('symbol:   ', describeTypeOf(Symbol('sangam')))
console.log('undefined:', describeTypeOf(undefined))
console.log('function: ', describeTypeOf(() => {}))
console.log('null:     ', describeTypeOf(null))
console.log('object:   ', describeTypeOf({}))

function info(z: unknown) {
  if (Array.isArray(z)) {
    return { kind: 'array' as const, value: z }
  }

  if (z instanceof Date) {
    return { kind: 'date' as const, value: z }
  }

  if (z instanceof Error) {
    return { kind: 'error' as const, value: z }
  }

  return { kind: 'other' as const, value: z }
}

console.log('\n--- info ---')
console.log('array: ', info([1, 2, 3, 4, 5]))
console.log('date:  ', info(new Date()))
console.log('error: ', info(new Error('oops! Error occurred')))
console.log('other: ', info({ x: 1 }))
