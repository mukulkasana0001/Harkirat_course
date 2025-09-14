type user={
 name:string;
 age:number
}
type  admine={
 name:string;
 allow:boolean;
}
type useroradmine= user| admine;

let  pe:useroradmine 

//  pe={
//         name:"mukul",
//     age:22,
//     allow:true 
//     }

 pe={
        name:"mukul",
    age:22
    }

 console.log(pe.name)
 console.log(pe.age)





// function greet(p:useroradmine){

//     p={
//         name:"mukul",
//     age:22,
//     allow:true 
//     }
//    console.log(p.name) 

//    console.log(p.age) 
//    console.log(p.allow) 
// }



// function greet9(p: useroradmine) {
//     // p={
//     //     name:"mukul",
//     // age:22
//     // }

//     console.log(p.age);     // if not comment upper one then not show error 
// }


