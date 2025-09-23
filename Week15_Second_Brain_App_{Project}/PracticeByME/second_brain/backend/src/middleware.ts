import  type { Request,Response,NextFunction } from "express";

import  Jwt, { type JwtPayload }  from "jsonwebtoken";

import dotenv  from "dotenv";
dotenv.config({ path: ['.env.local', '.env'] });
const JWT_SECRET = process.env.JWT_SECRET as string;;


// declare global {
//       namespace Express {
//         interface Request {
//           userId?: string
//       }
//     }
// }



const usermiddleware = (req:Request,res:Response,next:NextFunction)=>{
    
    const token = req.headers.token;

    const founduser = Jwt.verify(token as string,JWT_SECRET);
   
      
     if(founduser){
        //@ts-ignore
        req.userId= (founduser as JwtPayload).id;;
        next();
     }
     else{
        res.json({
            msg:"NOT LOGED IN "
        })
      }
   

}

export {usermiddleware}
