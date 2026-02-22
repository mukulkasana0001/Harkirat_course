import  express  from "express";
import jwt from 'jsonwebtoken'
import { middleware } from "./middleware";

const app = express();




app.use(express.json());

app.post('/signup',(req,res)=>{
    const {userid,username,password,}=req.body;
    if (!userid || !username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // db call

    const token = jwt.sign({
        userId:userid}
        ,"secret")

        res.json({
            token
        })
    
})

app.post('/signin',(req,res)=>{
    const {username,password,}=req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // db call
    const userid="fbbfbb "


        const token = jwt.sign(
        { userId: userid },
        "secret"
    );

        res.json({
            token
        })
    
})



app.post("/room",middleware,(req,res)=>{


    res.json({
        roomid:1234
    })
})
app.listen(3001);
