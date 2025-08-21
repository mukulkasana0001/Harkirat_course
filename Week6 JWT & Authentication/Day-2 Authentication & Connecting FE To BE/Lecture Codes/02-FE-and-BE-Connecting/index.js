const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
// const JWT_SECRET = "randomabc"

app.use(express.json())


const users = []




//
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
})

app.post("/signup", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;


    users.push({
        username: username,
        password: password
    });
    res.json({
        message: "Signed in successfully!"
    });
})


app.post("/signin",function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            foundUser = users[i];
        }
    }

    if (!foundUser) {
        return res.status(401).json({
            message: "Invalid Credentials"
        });
    }
    else {
        const token = jwt.sign({
            username
        }, JWT_SECRET);

        res.json({
            token: token
        });
    }
});


function auth(req, res, next) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "Token is missing" });
    }


    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        if (decodedData.username) {
            req.username = decodedData.username;
            next();
        } else {
            res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        res.status(401).json({ message: "Failed to authenticate token" });
    }
}


app.get("/me", auth, function (req, res) {
    const foundUser = users.find(user => user.username === req.username);

    if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        username: foundUser.username,
        password: foundUser.password
    });
});


app.listen(3000);