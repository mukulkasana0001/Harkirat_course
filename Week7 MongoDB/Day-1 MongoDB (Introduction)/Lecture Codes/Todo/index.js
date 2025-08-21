const express =  require("express");
const jwt =  require("jsonwebtoken");

const {usermodel,todomodel}= require('./db');
const mongoose= require("mongoose");
// const JWT_SECRET = process.env.JWT_SECRET;
// const MONGO_URI = process.env.MONGO_URI

 
// mongoose.connect(MONGO_URI)



const app = express();

app.use(express.json())  // for parse the body 

app.post('/signup',async (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    
   await usermodel.create({
        name: name,
        email: email,
        password: password
    })

     res.json({
        message: "You are signed up"
    })

})

app.post('/signin',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    const user = await usermodel.findOne({
        email:email,
        password:password
    })

    console.log(user)
    if(user){
        const token = jwt.sign({
          id: user._id
        },JWT_SECRET)

        res.json({
           token
        })
    }
    else{
        res.status(403).json({
            msg:"Invalid credentials"
        })
    }
})




function auth(req,res,next){

    const token = req.headers.token;
     const decodeduser = jwt.verify(token,JWT_SECRET);
      const userId =  decodeduser.id;
      if(userId){
        req.userId=userId;
        next();
      }
      else{
        res.json({
            msg:"NOT LOGED IN "
        })
      }

}






app.post('/todo',auth,async(req,res)=>{
     const userId = req.userId;
     const title = req.body.title;
     const done = req.body.done;

    await todomodel.create({
        title,
        userId,
        done
    })

    res.json({
        msg:"Todo Created successfully"
    })


})

app.get('/todos',auth,async (req,res)=>{
     const userId = req.userId;
     

     const todos = await todomodel.findOne({
        userId:userId
    })

    if(todos){
        res.json({
            todos
        })
    }
    else{
        res.json({
            msg:"error"
        })

    }

        
     
})


app.listen(3000);