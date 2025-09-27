const mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId=Schema.Types.ObjectId;


const  user=new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
})
const  admine=new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
})

const course =new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId
})

const purchesedcourse =new Schema({
     userId:ObjectId,
     courseId:[ObjectId]
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
