//013_params_annotations.ts

function func1(a:number,b:number) : number{
    return a + b
}

const nums12 = [1,2,3]

const doubled = nums12.map(n=>n*2) // (n:number)
console.log(doubled);

const times2 = (n : number)=>n*2 // always prefer to give annotations

console.log(times2(3))
type Point = {x:number; y:number}

function distanceFromOrigin(p:Point) : number {
    return Math.hypot(p.x , p.y)
}

console.log(distanceFromOrigin({x:3,y:2}))