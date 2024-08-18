import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): void {
    const token = (req.headers.authorization).split(" ")[1];
    try {
        jwt.verify(token, process.env.SECRET_KEY, { algorithms: ["HS256"] });
        // console.log(verify["username"]);
        next()
    } catch {
        res.status(401).json({ message: "UNAUTHORIZED" });
    }

}

export default AuthorizationMiddleware;