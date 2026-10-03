//024_generics_constraints.ts

//<T> -> constraint T so that only certain shapes are allowed 
//<T extends X>
//key constraints -> <K extends keyof T> -> k must be a key of T
//.length

function lenN4<T extends {length:number}>(xN4:T) : number {
    return xN4.length
}

console.log(lenN4('hello'));
console.log(lenN4([1,2,3,4,5]));
console.log(lenN4({length:10,tag: 'ok'}));


//Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
//console.log(lenN4(123));


type UserN6 = {id:string;name:string; age?:number}

function userN6Extract<T,K extends keyof T>(arrN4: T[], keyN4:K) : Array<T[K]>{
    return arrN4.map(item=>item[keyN4])
}

const usersN6 : UserN6[] = [
    {
       id: '1', name :'name', age:34,
    },
    {
       id: '2', name :'name2',  
    }
   
]

console.log(userN6Extract(usersN6,'id'));
console.log(userN6Extract(usersN6,'name'));
console.log(userN6Extract(usersN6,'age'));
