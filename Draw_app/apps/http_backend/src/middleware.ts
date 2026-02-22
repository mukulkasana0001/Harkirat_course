import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";



declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"] ?? "";


    const decoded = jwt.verify(token, "secret");

    if (!decoded) {

        res.status(404).json({
            msg: "Unauthorize"
        })
    } else {

        req.userId = (decoded as JwtPayload).userId;
        next();
    }
}





