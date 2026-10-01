//020_index_signatures.ts


type NumberDict = {[k: string]:number}

const counters : NumberDict = {}

counters['Likes'] = 1
counters['Comments'] = 2
counters['shares'] = 100

type Metrics = Record<'likes' | 'views' |'shares' , number> // tight and safer

const mm : Metrics = {likes : 1, views : 100, shares: 23}

console.log(mm);
const priceMap =  new Map <string , number>()
priceMap.set('likes',1)
console.log(priceMap)
console.log(priceMap.set('likes',1))

type LooseMap = Record<string,number | undefined>
const lm : LooseMap = {};
lm['x'] = undefined;
lm['y'] = 100;
console.log(lm, `${lm['x']} ${lm['y']}`)

//outPut :
// { likes: 1, views: 100, shares: 23 }
// Map(1) { 'likes' => 1 }
// Map(1) { 'likes' => 1 }
// { x: undefined, y: 100 } undefined 100

