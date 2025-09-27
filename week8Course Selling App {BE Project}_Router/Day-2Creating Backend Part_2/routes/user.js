const {Router}=require("express")
const userrouter= Router();
const jwt = require("jsonwebtoken");
const bcrypt =  require('bcrypt');
const { usermodel, purchesedcoursemodel, coursemodel } = require("../db");
const { usermiddle } = require("../middlewares/usermiddleware");
require("dotenv").config()
const JWT_SECRET = process.env.JWT_SECRET


userrouter.post('/signup',async (req,res)=>{  ////ab userRouter bana chuke hai aur routing kiye hai toh we don't have access of app so userRouter use krenge uske jgah pe 

    const {name,email,password}=req.body

    const hashedpassword=  await bcrypt.hash(password,6)

    try {
         await usermodel.create({
        name,
        email,
        password:hashedpassword
    })
    res.json({
        msg:"user signip"
    })
    } catch (error) {
       res.json({
        msg:"error found= "+error
    }) 
    }
    
    
})

userrouter.post('/signin',async (req,res)=>{
   
    const {email,password}=req.body

    const user = await usermodel.findOne({
        email
    })
    
 const matchedpassword = await bcrypt.compare(password,user.password)
  if(matchedpassword){
const usertoken = jwt.sign({
        id:user._id.toString()
    },JWT_SECRET)

    res.json({
        usertoken
    })
  }
    
    
})

userrouter.get('/purchases',usermiddle,async (req,res)=>{
     const userId=req.id
     
     const purchasedbyuser = await purchesedcoursemodel.findOne({
        userId
     })
     if(!purchasedbyuser){
        return res.status(404).json({
            message:"No purchases found",
        });
    }



    //  const purchasesCourseIds = purchases.map((purchase) => purchase.courseId);   //  **BY HARKIRAT (if you not take purchase.courseId as na array of objectID then you can use this approch )
    // // Find all course details associated with the courseIds
    // const courseData = await courseModel.find({
    //     _id: {$in:purchasesCourseIds}, 
    // });

        const courses = await coursemodel.find({
            _id:purchasedbyuser.courseId
        })
        
        res.json({
            courses
        })
     


})

module.exports={
    userrouter
}