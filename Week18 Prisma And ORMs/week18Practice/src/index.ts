import { PrismaClient } from "@prisma/client";

const client= new PrismaClient()



async function name() {
   await client.todo.create({
    data:{
        user_id:1,
        title:"Title for user 1 ",
        description:"description for user 1"
    }
})

//   const user =await client.user.findFirst({
//     where:{
//         username:"mukul1",
//         password:"12345678"
//     },

// })

// console.log(user)
}

name()


