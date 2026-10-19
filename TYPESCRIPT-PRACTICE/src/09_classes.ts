//classes
//declare a class
//readonly property
//class fields
//public,private modifiers
//private methods
//getters, setters
//child class
//super keyword
//protected modifier
//abstract class and methods
//implements interfaces
//short syntax for constructor method

class Animal {
    name : string;
    age: number;
    readonly species: string;
  constructor(name: string, age: number, species: string){
    this.name = name;
    this.age = age;
    this.species = species
  }
}

const tom = new Animal("Tom", 10, "Dog");
console.log(tom);
tom.name = "tony";
//tom.species = "lion "; //Cannot assign to 'species' because it is a read-only property.

