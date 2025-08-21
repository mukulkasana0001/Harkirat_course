const express = require("express");
const { usermodel, todomodel } = require("./db");
const app = express()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI

if (!JWT_SECRET) throw new Error("JWT_SECRET not set");
if (!MONGO_URI) throw new Error("MONGO_URI not set");

const mongoose = require("mongoose")
const { z } = require("zod")                      //Zod ko import kiye hai 

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI);          //.net/DATABASE_Name - idhar agar koi new database k name add krenge toh woh create kr dega aur existing mein chahiye toh uska name add kr do 
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1); // stop the app if DB fails
    }
}

connectDB();

app.use(express.json())                         // when you use 'safeParse(req.body); ' and by 'parsedDataSuccess.data;' you can get all req.body object 

app.post("/signup", async function (req, res) {

    const requiredBody = z.object({             //idhar zod use kiye hai..jisse woh teen input lega jo ki teeno string hone chahiye 
        email: z.string().min(3).max(100).email(),                     //zod ka schema yeh hai here we multiple input validation things..this one tell ki minimum 3 characters hone chahiye max 100 and a email should be there
        name: z.string().min(3).max(100),
        password: z.string().min(3).max(100)
    })



    // Adding More Rules*****
    // const requiredBody = z.object({
    // name: z.string().min(2, "Name too short"),
    // email: z.string().email("Invalid email"),
    // password: z.string().min(6, "Password too short").regex(/[0-9]/, "Password must have a number").regex(/[A-Z]/, "Password must have at least one capital letter") 
    //  });





    // const parsedDataSuccess = requiredBody.Parse(req.body);        //.parse only In it if error come then website crashed so you nedd to rapeup it into try-catch block , where as  safeParse will return an obj if error came 
    const parsedDataSuccess = requiredBody.safeParse(req.body);         //yeh data ko check kr rha ki input kiya hua data zod ke schema k accrding hai ya nahi

    if (!parsedDataSuccess.success) {                     //If data is not correct then yeh response return kr do
        res.json({
            message: "Incorrect Format",
            error: parsedDataSuccess.error              //yeh return kr dega ki user jis format mein input kr rha uspe error kya hai...jisse woh resignin/signup kre sahi format mein
        })
        return
    }



    // use parsed.data (already validated)
    const { email, password, name } = parsedDataSuccess.data;     // so now no need to doing the below thing like "const email = req.body.email;   " 

    // const email = req.body.email;               //yaha body pe req ja rha hai isliye eisko parse krna hai 
    // const password = req.body.password;
    // const name = req.body.name;



    try {                                            //Tr catch use kr diye jisse kuch error bhi aye toh woh error handle ho jaye na ki server crash ho jaye 
        const hashedPassword = await bcrypt.hash(password, 5)      //will return a promise isliye await...5 isliye kyuki utne number of times woh salt ko add krke hash krega..woh nhi bhi likhnge toh chalega aur nahi likhnge toh await ka jrurt nahi

        await usermodel.create({                    //isko await isliye kiye may be error ho skta hai like user idhar input diya nhi but res.json se message phle mil jaye isliye isko await kiye jisse woh phle data le le phr woh res.json ka message show krega..warna await ni krenge toh then if database connect nhi hoga phr bhi woh message return kr dega 
            email: email,
            password: hashedPassword,
            name: name
        });
        res.json({
            "message": "You are signed up!"
        });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({ message: "User already exists" });
        }
        console.error(e);
        return res.status(500).json({ message: "Internal server error" });
    }




});

app.post("/signin", async function (req, res) {

    const email = req.body.email;
    const password = req.body.password;
    const emailresponse = z.string().min(3).max(100).email();                   //zod ka schema yeh hai here we multiple input validation things..this one tell ki minimum 3 characters hone chahiye max 100 and a email should be there

    const emailvalid = emailresponse.safeParse(email)
    if (!emailvalid.success) {                     //If data is not correct then yeh response return kr do
        res.json({
            message: "Incorrect emailt",
            error: emailvalid.error              //yeh return kr dega ki user jis format mein input kr rha uspe error kya hai...jisse woh resignin/signup kre sahi format mein
        })
        return
    }


    const user = await usermodel.findOne({              //userModel se search krega ki yeh username hai ya nhi and hai toh sirf email lega kyuki password ab nahi lega kyuki is barr password hashed ho chuka hai ..plain password se alag hai
        email: email
    })

    if (!user) {
        res.status(403).json({
            "message": "User not found in database"
        })
        return
    }

    const passwordMatch = await bcrypt.compare(password, user.password);  //isse compare kr rhe hai ki hashed pass done same hui ya nahi... aur isko bhi await krwana pdega..


    if (passwordMatch) {                          //if password match hua toh yeh niche ka kaam hoga warna else return kr dega                            //if uses is there ..then generate the jwt token
        const token = jwt.sign({
            id: user._id.toString()                      //sare users ka ek id hoga User collection mai jo sabke liye alg hoga ..isliye is barr hmlog user._id ko sign krenge aur token generate idhar se krwaynge...aur isko string mein convert kr rhe hai..kyuki id mongoDb mein object ID hota hai 
        }, JWT_SECRET);
        res.json({
            token: token
        });
    }
    else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
});


//jaise hi middleware sab kuch pass kr dega so the controll will reach here in todo and todos routes
app.post("/todo", auth, async function (req, res) {          //Yeh todos ko add krne ke liye hai 
    const userId = req.userId;                      //middleware ke pass se jo req.userId jispe decodedData ka id hai woh idhr pass on hua 
    const title = req.body.title                    //yaha se title input denge 
    const done = req.body.done
    await todomodel.create({                        //database call isliye await kiye
        title,                                      //TodoModel wale collection mein yeh create ho jyega 
        userId,
        done
    })
    res.json({
        message: "Todo created!"
    })
});

app.get("/todos", auth, async function (req, res) {           //yeh kaunsa todo kis user ka hai woh return krne k liye..ki like kaunsa userId pe kya kya todo hai yeh btayega woh
    const userId = req.userId;                              //middleware ke pass se jo req.userId jispe decodedData ka id hai woh idhr pass on hua 

    const todos = await todomodel.find({                    //userId se woh todos ko search kr lega for this specific id provided to it
        userId
    })

    res.json({
        todos                                                //todos jo milnge woh output pe milenge 
    })

});

function auth(req, res, next) {                              //same auth fucntion which was used before 
    const token = req.headers.token

    if (!token) return res.status(401).json({ message: "Token missing" });

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}


app.listen(3000);



/*
Notes:
Here we are using Zod library for the input validation - 
    - Input validation se jisse pata chal paye ki mko user se body mein teen cheex chahiye toh utna hi input de aur jo string mein chahiye toh string input kre na ki ko object input kre 
*/