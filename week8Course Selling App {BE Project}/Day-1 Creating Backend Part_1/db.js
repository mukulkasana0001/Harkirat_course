const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;


const  user=new Schema({
    name:String,
    email:{type:String,require:true},
    password:String,
})
const  admine=new Schema({
    name:String,
    email:{type:String,require:true},
    password:String,
})

const course =new Schema({
     title:String,
     description:String,
     coursecreater:ObjectId
})

const purchesedcourse =new Schema({
     courseid:ObjectId,
     userid:ObjectId
})

const usermodel = mongoose.model("users",user)
const adminemodel = mongoose.model("admines",admine)
const coursemodel = mongoose.model("courses",course)
const purchesedcoursemodel = mongoose.model("purchesedcourses",purchesedcourse)



module.exports={
    usermodel,
    adminemodel,
    coursemodel,
    purchesedcoursemodel
}
