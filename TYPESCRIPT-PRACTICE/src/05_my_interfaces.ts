export interface Member {
    Member1 : string;
    Member2 : string;
    Income ?: number; //Optional
}

//types cannot be redeclared but interface can be redeclared
//types vs interface

export interface Member {
    address? :{
        country : string;
        pinCode : number;
        houseNumber : number;
        city: string;
        state: string;
    };

    contactNumber ? : string;
   
}



