//012_tuples.ts

//tuples ->  fixed length and fixed types
//(string | number)[]
//optional tuples

//Tuples
const userEntry : [string,number] = ['Kapil',29]

//Optional Tuple
type ResponseRow = [status:number, message?:string]

const r11: ResponseRow = [200]

const corners : readonly [number,number] = [0,1]
