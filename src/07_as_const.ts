//07_as_consts.ts

const ROLES = ["admin","user","operator"] as const

//deriving a union from the array
type Role = (typeof ROLES)[number]

function setRole(r:Role){
    console.log(r)
}

setRole('admin')