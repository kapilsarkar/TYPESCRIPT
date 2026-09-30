//09_intersection.ts

//value must be everything from A to from B

type Inter1 = {id: string}
type Inter2 = {createdAt: Date}

type Entity = Inter1 & Inter2 //must have both id and createdAt

const e: Entity = {id:'e1', createdAt : new Date()}


type NumberHolderUnique = {a: number}
type StringHolderUnique = {a: string}

// type NumberStringMix = NumberHolderUnique & StringHolderUnique
// const bad : NumberStringMix = {a:123}

type Product = {id:string; title:string}
type Priced = {price:number}

type PricedProduct = Product & Priced
