import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { authenticate } from "../middleware/authenticate.js";


const client = new PrismaClient()
const userRouter = Router()


userRouter.post('/signup', async (req, res) => {

    const { username, firstname, lastname, password } = req.body;

    console.log(username)
    const user = await client.user.findFirst({
        where: {
            username: username,
        }
    });

    if (user) {
        return res.status(409).json({ message: "User already exists" });
    }


    const hashedPasspord = await bcrypt.hash(password, 6)


    try {

        const user = await client.user.create({
            data: {
                username: username,
                firstname: firstname,
                lastname: lastname,
                password: hashedPasspord,
                account: {create: {
                    balance: Number((Math.random() * 10000).toFixed(2))
                }    

            }
        }});

        const token = jwt.sign({
            userId: user.id
        }, 'secretkey')

        console.log(user);
        res.status(200).json({ message: "Signup successful", token });

    } catch (error) {
        console.log(error)
    }


});


userRouter.post('/signin', async (req, res) => {

    const { username, password } = req.body;
    const user = await client.user.findFirst({
        where: {
            username: username,
        }
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials user not exist" });
    }

    const matchedpassword = await bcrypt.compare(password, user.password)

    if (matchedpassword) {
        const token = jwt.sign({
            userId: user.id
        }, 'secretkey');
        res.status(200).json({ message: "Signin successful", token });
    } else {
        res.status(401).json({
            message: "Incorrect Password"
        })
    }
})





userRouter.put('/', authenticate, async (req, res) => {

    const userId = req.userId;

    const { firstname, lastname, password } = req.body;
    const updatedData: { firstname?: string; lastname?: string; password?: string } = {};

    if (firstname) {
        updatedData.firstname = firstname;
    }
    if (lastname) {
        updatedData.lastname = lastname;
    }
    if (password) {
        const hashedPasspord = await bcrypt.hash(password, 6)
        updatedData.password = hashedPasspord;
    }
    try {
        const updatedUser = await client.user.update({
            where: {
                id: Number(userId),
            },
            data: updatedData,
        });
        console.log(updatedUser);

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
        });
    }

    res.status(200).json({
        message: "User updated successfully"
    });

})



userRouter.get('/all', authenticate, async (req, res) => {

    const userId = req.userId;
    const { username } = req.query


    try {
        const users = await client.user.findMany({
            where:  username ? {
                AND : [ 
                    {
                     id: { not: Number(userId) }}, // exclude current user
                   { username: {
                        contains: String(username),   // match usernames that include given text
                        mode: 'insensitive',           // make search case-insensitive
                    }}
                ]
                } : {id:{not: Number(userId)}} ,   //If no username is provided :  It simply excludes the current user.
            select: {
                id: true,
                username: true,
                firstname: true,
                lastname: true,
            }
        }  
         
        );
        return res.status(200).json({
            users
        });
    }

catch (error) {
    console.log(error);
    return res.status(500).json({
        message: "Internal server error"
    });
}
});




export default userRouter