const Router = require("express")

const courserouter = Router()

courserouter.get('/',(req,res)=>{
    res.json({
        msg:"all courses"
    })
})

// Harkirat********
// courseRouter.post("/purchase", function(req, res){          //this routes for user jo purchase krega courses
//     res.json({
//         message: "Signup endpoint"
//     })
// })

// courseRouter.get("/preview", function(req, res){
//     res.json({
//         message: "Signup endpoint"
//     })
// })


module.exports  ={
    courserouter
}