//027_utils_functions_union_helpers.ts

//Return Type<F>
//Parameters<F>
//InstanceType<Constructor>
//ConstructorFroParameter<C>

function ExtractUserInfo(id:string, isExtraInfo=false){
    return {
        id,
        name:'Kapil',
        log:isExtraInfo ? "details" : (undefined as string | undefined)
    }
}

type GetUsersReturnInfo = ReturnType<typeof ExtractUserInfo>
type GetUserParamsInfo = Parameters<typeof ExtractUserInfo>

const argsInfo : GetUserParamsInfo = ["u1", true]
const resultInfo: GetUsersReturnInfo = ExtractUserInfo(...argsInfo)

console.log(resultInfo)

class PersonN1 {
    constructor (public name: string, public age: number){}

    greet(){
        return `Hi I am this -> ${this.name}`
    }
}

type PersonInstanceN1 = InstanceType<typeof PersonN1>
type PersonCtorArgsN1 = ConstructorParameters<typeof PersonN1>

const resultInfo1 : PersonCtorArgsN1 = ['Kapil', 34]
const abc : PersonInstanceN1 = new PersonN1(...resultInfo1)

console.log(abc.greet())
