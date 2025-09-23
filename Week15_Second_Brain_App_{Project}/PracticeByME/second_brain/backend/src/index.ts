import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import cors from 'cors'
import { contentModel, LinkModel, userModel } from './db.js'
import { usermiddleware } from './middleware.js'
import { randomHash } from './utils_ransom.js'
dotenv.config({ path: ['.env.local', '.env'] });
const MONGO_URI = process.env.MONGO_URI as string;
const JWT_SECRET = process.env.JWT_SECRET as string;;

mongoose.connect(MONGO_URI)
// let token="";

const app = express()

app.use(
  cors()
);

console.log("running")
app.use(express.json());

app.post('/api/v1/signup', async (req, res) => {
   const username = req.body.username;
   const password = req.body.password;
   
   const founduser = await userModel.findOne({
      username
   })
   if(founduser){
      res.json({
      msg: "User Name alerady exist"
   })
   return;
   }


   await userModel.create({
      username: username,
      password: password
   })


   res.json({
      msg: "signup successfully"
   })
})

app.post('/api/v1/signin', async (req, res) => {

   const username = req.body.username;
   const password = req.body.password;
   const foundUser = await userModel.findOne({ username: username, password: password })
   if (foundUser) {
      const token = jwt.sign({
         //@ts-ignore
         id: foundUser._id
      }, JWT_SECRET)
      res.json({
         token
      })

   } else {
      res.json({
         msg: "user not found  Incorrect Credientials"
      })
   }


})


app.post('/api/v1/content', usermiddleware, async (req, res) => {
   //@ts-ignore
   const userId = req.userId;
   const link = req.body.link;
   const type = req.body.type;
   const title = req.body.title;

   await contentModel.create({
      link,
      type,
      title,
      userid: userId,
      tag: []
   });

   res.json({ message: "Content added" });
})


app.get('/api/v1/content', usermiddleware, async (req, res) => {
   //@ts-ignore
   const userId = req.userId;
   //  const user = await contentModel.findOne({userid:userId});
   console.log(userId);
   const content = await contentModel.find({ userid: userId }).populate("userid", "username")
   console.log(content);
   res.json({
      content
   })
})

app.delete('/api/v1/delet', usermiddleware, async (req, res) => {
   //@ts-ignore
   const userid = req.userId;
   const contentid = req.body.contentId;
   await contentModel.deleteMany({
      _id: contentid,
      userid: userid
   })

   res.json({
      msg: "deleted successfully"
   })
})

app.post('/api/v1/brain/share', usermiddleware, async (req, res) => {
   const share = req.body.share;
   
   if (share) {

      const aleradyExist = await LinkModel.findOne({
         //@ts-ignore
         userid: req.userId
      })
      if (aleradyExist) {
         res.json({
            hash: aleradyExist.hash
         })
         return;
      }

      const hash = randomHash(10);
      await LinkModel.create({
         hash: hash,
         //@ts-ignore
         userid: req.userId
      })

      res.json({
         hash: hash
      })
   }
   else {
      await LinkModel.deleteOne({
         //@ts-ignore
         userid: req.userId
      })
      res.json({ message: "Removed link" });
   }



})

app.get('/api/v1/brain/share/:Sharehash', async(req, res) => {
  const hash = req.params.Sharehash;

  console.log("hash : " + hash)
  const linked =  await LinkModel.findOne({
   hash:hash
  }).populate("userid", "username")

   if (!linked) {
      return res.status(404).json({ error: "Hash not found" });
    }

  const content = await contentModel.find({
   userid:linked?.userid
  })


  res.json({
   
    username:  (linked.userid as any).username ,
    
    content: content
  })




})

app.listen(3000)


