const Router = require("express")
const { usermiddle } = require("../middlewares/usermiddleware");
const { purchesedcoursemodel, coursemodel } = require("../db");

const courseRouter = Router()
 
// courserouter.get('/',(req,res)=>{
//     res.json({
//         msg:"all courses"
//     })
// })

// Harkirat********
courseRouter.post("/purchase",usermiddle, async(req, res)=>{          //this routes for user jo purchase krega courses
    const userId=req.id
    const courseId= req.body.courseId
   
    let purchase = await purchesedcoursemodel.findOne({ userId });
    
    if (purchase) {
    if (!purchase.courseId.includes(courseId)) {
      purchase.courseId.push(courseId);
      await purchase.save();     //it saves the updated document back into MongoDB after you push the new courseId into the courseId array.
    }
  } else {
    purchase = await purchesedcoursemodel.create({
      userId,
      courseId: [courseId]  
    });
  }
    
    res.json({
        message: "user : "+userId+" purchased course : " +courseId
    })
})

courseRouter.get("/preview", async (req, res)=>{
    const courses= await coursemodel.find({});

    res.json({
        courses
    })
})


module.exports  ={
    courseRouter
}