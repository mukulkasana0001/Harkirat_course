const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI
// const JWT_SECRET = "";


const { usermodel, todomodel } = require('./db');
const mongoose = require("mongoose");


mongoose.connect(MONGO_URI)




const app = express();

app.use(express.json())  // for parse the body 

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    
    try {
        const hashpassword = await bcrypt.hash(password, 5)
        await usermodel.create({
            name: name,
            email: email,
            password: hashpassword
        })
          
        return res.json({ message: "You are signed up"})
    } catch (e) {
       if (e.code === 11000) { // MongoDB duplicate key error
        return res.status(400).json({ message: "User already exists" });
          }
    return res.status(500).json({ message: "Internal server error" });
    }


    
    // res.json({
    //     message: "You are signed up"
    // })
    

})

app.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await usermodel.findOne({
        email: email,
    })

    const matchpassword = bcrypt.compare(password, user.password)

    console.log(user)
    if (matchpassword) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET)

        res.json({
            token
        })
    }
    else {
        res.status(403).json({
            msg: "Invalid credentials"
        })
    }
})




function auth(req, res, next) {

    const token = req.headers.token;
    const decodeduser = jwt.verify(token, JWT_SECRET);
    const userId = decodeduser.id;
    if (userId) {
        req.userId = userId;
        next();
    }
    else {
        res.json({
            msg: "NOT LOGED IN "
        })
    }

}






app.post('/todo', auth, async (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    await todomodel.create({
        title,
        userId,
        done
    })

    res.json({
        msg: "Todo Created successfully"
    })


})

app.get('/todos', auth, async (req, res) => {
    const userId = req.userId;

    const todos = await todomodel.findOne({
        userId: userId
    })

    // const user = await usermodel.findOne({
    //     _id:userId
    // })
    if (todos) {
        res.json({
            todos
        })
    }
    else {
        res.json({
            msg: "error"
        })

    }



})


app.listen(3000);