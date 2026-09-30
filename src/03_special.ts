//03_special.ts

//strictNullChecks 
// let title : string = "intro"
// title = undefined

let subtitle : string | undefined = "kapil";

// void : function doesn't return any useful value
function  log(msg: string) : void{
  console.log(msg)
}

//never returns
function fail(msg:string) : never{
    throw new Error(msg)
}

//DO NOT USE ANY -> TRY TO IGNORE AS MUCH AS POSSIBLE

const valueAny : any = JSON.parse('{"x" :1}')

valueAny.notThere.toFixed(2) // this compiles but can break/explore at run time