const {Router}= require("express")

const adminerouter= Router()


adminerouter.post('/signup',(req,res)=>{
    res.json({
        msg:"admine signup"
    })
})
adminerouter.post('/signin',(req,res)=>{
    res.json({
        msg:"admine signin"
    })
})

adminerouter.post('/couses',(req,res)=>{
    res.json({
        msg:"admine all courses"
    })
})

module.exports={
    adminerouter
}

