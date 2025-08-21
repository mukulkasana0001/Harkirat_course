const express = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "mukulsecret"


const app = express();
app.use(express.json())

const users = [];

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })
    res.send({
        message: "You have signed up"
    })
});



app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    let foundUser = null;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == password) {
            foundUser = users[i];
            break;
        }
    }
    if (foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET);

        res.json({
            token: token,
            message: "Signed in"
        })
    }
    else {
        res.status(403).send({
            message: "INVALID CREDINTIALS"
        })
    }
});

app.use(function(req,res,next){
    console.log("in middle")
    const token = req.headers.token;
     const decodeduser = jwt.verify(token,JWT_SECRET);
      const username =  decodeduser.username;
      if(username){
        req.username=username;
        next();
      }
      else{
        res.json({
            msg:"NOT LOGED IN "
        })
      }

})

app.get("/me",(req,res)=>{
      console.log("inme")
    let foundUser= null;
     const username= req.username;
         
        for (let i = 0; i <users.length; i++) {
            if(users[i].username==username){
                foundUser = users[i];
                break;
            }
        }

        res.json({
             userName: foundUser.username,
            userPassword: foundUser.password
        })

})


app.listen(3000);