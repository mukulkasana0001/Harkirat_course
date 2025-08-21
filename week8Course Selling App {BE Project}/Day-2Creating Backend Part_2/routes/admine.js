const { Router } = require("express")
const { adminemodel, coursemodel } = require("../db")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { adminemiddle } = require("../middlewares/adminemiddleware");
require("dotenv").config();


const JWT_SECRET = process.env.JWT_SECRET

const adminerouter = Router()



adminerouter.post('/signup', async (req, res) => {

    const { name, email, password } = req.body

    const hashedpassword = await bcrypt.hash(password, 6)

    await adminemodel.create({
        name,
        email,
        password: hashedpassword
    })

    res.json({
        msg: "admine signup"
    })
})

adminerouter.post('/signin', async (req, res) => {

    const { email, password } = req.body

    

    const admine = await adminemodel.findOne({
        email
    })
    console.log(admine)
    const matchedpassword = await bcrypt.compare(password, admine.password)
    if (matchedpassword) {
        const adminetoken = jwt.sign({
            id: admine._id.toString()
        }, JWT_SECRET)

        res.json({
            adminetoken
        })
    }

})

adminerouter.post('/course',adminemiddle, async (req, res) => {
    const {title,description,price,imageUrl}  = req.body
    const admineid=req.id
   
    await coursemodel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId:admineid
    })

    res.json({
        msg: "course post  successfully "
    })
})

adminerouter.put('/course',adminemiddle, async (req, res) => {
   const {title,description,price,imageUrl,courseid}  = req.body
    const admineid=req.id

     const course = await coursemodel.findOne({
        _id: courseid, 
        creatorId: admineid, 
    });

    if(!course){
        return res.status(404).json({
            message: "Course not found!"
           });
    }


 await coursemodel.updateOne({
    creatorId:admineid,
    _id:courseid
 },{
   title,
   description,
   price,
   imageUrl
 })

   res.status(200).json({
        message: "Course updated!"
    });
})


adminerouter.get('/course/bulk',adminemiddle,async (req, res) => {
  const admineid=req.id

  const course = await coursemodel.find({
    creatorId:admineid
  })

    res.json({
        course
    })
})

module.exports = {
    adminerouter
}

