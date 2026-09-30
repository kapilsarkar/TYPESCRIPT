//014_optional_default.ts

function greetPersonOptional(name?:string) : string {
 const upperRes = name? name?.toUpperCase() : 'Guest'

 return `Hello ${upperRes}`
}

console.log(greetPersonOptional('Kapil Sarkar'));
console.log(greetPersonOptional());

function greetPersonDefault(name: string = 'Guest') : string {
    return `Hello ${name.toUpperCase()}`;
}

console.log(greetPersonDefault("Virat Kohli"));
console.log(greetPersonDefault());

function connect(host:string, port? :number, secure?:boolean ){
    const p = port ?? 80
    const s = secure ?? false

    return `Connect ${host} ${p} ${secure}`
}


console.log(connect('localhost', 100, true));