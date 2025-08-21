const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET

function adminemiddle(req,res,next) {

    const token = req.headers.token
    console.log(token);
  if(!token){
    res.json({
        msg:"token missing"
    })
  }
 
    try {
         const decodedData = jwt.verify(token, JWT_SECRET);
            req.id = decodedData.id;
            next();
        } catch (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
}

module.exports={
    adminemiddle
}

