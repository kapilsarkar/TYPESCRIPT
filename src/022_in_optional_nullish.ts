// 022_in_optional_nullish.ts

type InExample1 = { role: 'Admin'; permissions: string[] }
type InExample2 = { role: 'User'; expiresAt: Date }

type UserExample = InExample1 | InExample2

function describeUserExample(u: UserExample) {
  if ('permissions' in u) {
    return `Admin ${u.permissions.join(',')}`
  }

  return `User ${u.expiresAt.toISOString()}`
}

console.log('--- in operator (discriminated union) ---')
console.log(
  'Admin:',
  describeUserExample({ role: 'Admin', permissions: ['read', 'write'] }),
)
console.log(
  'User:',
  describeUserExample({
    role: 'User',
    expiresAt: new Date('2026-12-31T00:00:00.000Z'),
  }),
)

// avoid runtime crashes: ?? and ||, obj?.prop

type ProfileN3 = {
  name: string
  contact?: { email?: string }
}

const P1N3: ProfileN3 = { name: 'John' }
const P2N3: ProfileN3 = { name: 'Ben', contact: { email: 'ben123@gmail.com' } }

const email1N3 = P1N3.contact?.email
const email2N3 = P2N3.contact?.email

console.log('\n--- optional chaining (?.) ---')
console.log('P1N3.contact?.email (missing contact):', email1N3)
console.log('P2N3.contact?.email:', email2N3)

// ?? → default only when left is null or undefined
// || → default when left is any falsy value (0, "", false, null, undefined, NaN)

const countFromServerN3: number | null = 0
const labelFromServerN3: string | undefined = ''

const aN3 = countFromServerN3 ?? 100 // keeps 0
const bN3 = countFromServerN3 || 100 // becomes 100 (0 is falsy)

const cN3 = labelFromServerN3 ?? 'unknown' // keeps "" (empty string is not null/undefined)
const dN3 = labelFromServerN3 || 'unknown' // becomes 'unknown' ("" is falsy)

console.log('\n--- nullish coalescing (??) vs logical OR (||) ---')
console.log('countFromServerN3:', countFromServerN3)
console.log('count ?? 100 (aN3):', aN3)
console.log('count || 100 (bN3):', bN3)
console.log('labelFromServerN3:', JSON.stringify(labelFromServerN3))
console.log('label ?? "unknown" (cN3):', JSON.stringify(cN3))
console.log('label || "unknown" (dN3):', dN3)
