const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const  {usermodel,adminemodel,coursemodel,purchesedcoursemodel} = require("./db");
const { userrouter } = require("./routes/user");
const { adminerouter } = require("./routes/admine");
const { courserouter } = require("./routes/course");

const MONGO_URI = process.env.MONGO_URI


mongoose.connect(MONGO_URI)


const app = express();

app.use('/api/v1/user',userrouter);        //yaha prefix daal diye ki "/user" se jo bhi req ayega woh userRouter ke pass jyega 
app.use('/api/v1//admine',adminerouter);
app.use('/api/v1//courses',courserouter)


app.listen(3000);