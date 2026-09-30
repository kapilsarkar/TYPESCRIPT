
//inference example
const doubleFunc = (n:number)=>n*2

//explicit return for exported/public functions
export function toTitle(s:string): string{
    return `Hello ${s}`
}

function booleanToNumbers(flag:boolean):number {
    if(flag){
        return 1
    }
    else{
        return 0
    }
}


async function loadCountInferred(){
    
    return 42
}

loadCountInferred().then(n=>console.log(n))