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
    public name : string;
    public age: number;
    public readonly species: string;
    private isHungry : boolean = true;

  constructor(name: string, age: number, species: string){
    console.log("Constructor called")
    this.name = name;
    this.age = age;
    this.species = species
   
  }
  public get hungerStatus() : string {
    return this.isHungry ? `${this.name} is hungry` : `${this.name} is full`
  }

  public set feed (food:string) {
    this.isHungry = false;
    console.log(`${this.name} has been fed with ${food}`)
  }

  public get info() : string{
       return `${this.name} is a ${this.age} year old ${this.species}`
  }
}

class Dog extends Animal {

}



const tom = new Animal("Tom", 10, "Dog");
const tony = new Animal("Tony", 12, "Dog");
console.log(tom);
tom.name = "tony";
console.log(tony)
console.log(tony.hungerStatus)
//tony.feed("bread");
tony.feed = "bread";
console.log(tony.hungerStatus);

console.log(tom.info) 
//tom.species = "lion "; //Cannot assign to 'species' because it is a read-only property.

