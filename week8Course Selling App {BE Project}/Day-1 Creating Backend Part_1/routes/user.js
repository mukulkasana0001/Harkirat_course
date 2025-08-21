const {Router}=require("express")
const userrouter= Router();

userrouter.post('/signup',(req,res)=>{  ////ab userRouter bana chuke hai aur routing kiye hai toh we don't have access of app so userRouter use krenge uske jgah pe 
    res.json({
        msg:"user signip"
    })
})
userrouter.post('/signin',(req,res)=>{
    res.json({
        msg:"user signin"
    })
})
userrouter.get('/purchases',(req,res)=>{
    res.json({
        msg:"user purchased courses "
    })
})

module.exports={
    userrouter
}