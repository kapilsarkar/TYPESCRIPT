//05_literals.ts

type Direction = "left" | "right" | "up";

function move(d:Direction){
    console.log(d);
}

const d1 = "left" // TS keeps literals type "left"
move(d1)

//Argument of type 'string' is not assignable to parameter of type 'Direction'.
let d2 = "left" // TS widens to string
//move(d2)

let d3 : Direction = "left"
move(d3)
