//017_interfaces_basics

//interface -> named shape for objects

interface User333 {
    id: number;
    name: string;
    email?: string;
    readonly  createdAt : Date;
}

const user333 : User333 = {
    id:1 ,
    name:'Kapil',
    createdAt: new Date(), 
    email:"xyz@gmail.com" 
}

interface Admin333 extends User333 {
    permissions : string []
}

const admin333 : Admin333 = {
    id:2,
    name: "kapil as admin",
    createdAt : new Date(),
    email :"xyz@gmail.com",
    permissions : ['admin']
}

interface WithMeta1 {
    meta : {
        active : boolean
    }
}

interface AdminWithMeta extends Admin333 , WithMeta1 {}


const adminWithMeta333 : AdminWithMeta = {
    id:2,
    name: "kapil as admin",
    createdAt : new Date(),
    email :"xyz@gmail.com",
    permissions : ['admin'],
    meta:{
       active: true ,
    }
}