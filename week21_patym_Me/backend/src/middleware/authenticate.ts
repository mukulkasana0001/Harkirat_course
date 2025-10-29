import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


declare global {
      namespace Express {
        interface Request {                       // for===>  req.userId  = (decoded as JwtPayload).userId;
          userId?: string
      }
    }
}

export function authenticate(req:Request, res:Response, next:NextFunction) {
    const token = req.headers.token;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token as string, 'secretkey');
        if(!decoded){
            return res.status(401).json({ message: "Invalid token" });
        }
        // Attach userId to request object
        req.userId  = (decoded as JwtPayload).userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}