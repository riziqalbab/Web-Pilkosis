import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../Models/User';

dotenv.config();

async function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY as string, { algorithms: ["HS256"] });
        const username = (verify as any)["username"];
        
        const user = new UserModel();
        const userDetail = await user.Find({ username: username });

        if (userDetail.length > 0 && userDetail[0].role_user === "admin") {
            next();
        } else {
            res.status(401).json({ message: "UNAUTHORIZED" });
        }
    } catch {
        res.status(401).json({ message: "UNAUTHORIZED" });
    }
}

export default AuthorizationMiddleware;
