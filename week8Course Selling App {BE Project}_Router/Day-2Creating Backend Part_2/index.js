const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const  {usermodel,adminemodel,coursemodel,purchesedcoursemodel} = require("./db");
const { userrouter } = require("./routes/user");
const { adminerouter } = require("./routes/admine");
const { courseRouter } = require("./routes/course");

const app = express();

const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI)

app.use(express.json())

app.use('/user',userrouter);        //yaha prefix daal diye ki "/user" se jo bhi req ayega woh userRouter ke pass jyega 
app.use('/admine',adminerouter);
app.use('/courses',courseRouter)


app.listen(3000);