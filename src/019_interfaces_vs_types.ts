//019_interfaces_vs_types.ts

//interface -> object shapes that you expect to extend
//supports declaration merging
//types -> more general -> objects, unions, intersections, functions
//can not be reopened -> no merging

interface Box1 {
    width:number
}

interface  Box1{
    height : number
}

const boxDemo : Box1  = {width:10, height: 10}

console.log(boxDemo);

type Bag = {size:number}
//type Bag = {color:string}
//can't redeclare type alias name