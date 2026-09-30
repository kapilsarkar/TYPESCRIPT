//011_readonly_arrays.ts

const xss = [1,2,3,4,5]
const ys : readonly number[] = [1,2,3]
const yss : ReadonlyArray<number> = [1,2,3]


xss[0] =  9 //mutable

//yss.push(3) //Property 'push' does not exist on type 'readonly number[]'

function sum (nums:readonly number[]) : number {
    let s = 0;
    for(const n of nums) s+=n
    return s
}

console.log(sum(xss)); //passing mutable array in readonly param is allowed

const result = yss.map(n=>n*5)
console.log(result)