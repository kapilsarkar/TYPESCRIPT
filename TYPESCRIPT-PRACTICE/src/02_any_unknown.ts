let sameVariable: any;
sameVariable = 12;
console.log(sameVariable.toFixed(3)); // "12.000"

let unknownVariable: unknown;
let boolVar: boolean;

unknownVariable = 50;
if (typeof unknownVariable === "number") {
  console.log(unknownVariable.toFixed(3)); // "50.000"
}

unknownVariable = true;
if (typeof unknownVariable === "boolean") {
  boolVar = unknownVariable;
  console.log(boolVar); // true
}