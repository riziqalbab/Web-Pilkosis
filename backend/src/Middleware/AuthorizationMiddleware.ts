import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface CustomRequest extends Request {
    user: {
        id: string;
        username: string;
    };
}

function AuthorizationMiddleware(req: CustomRequest, res: Response, next: NextFunction): Response<any, Record<string, any>>|void {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string, { algorithms: ["HS256"] }) as jwt.JwtPayload;
        req.user = { id: decoded.id, username: decoded.username }; 
    } catch {
        res.status(401).json({ message: "UNAUTHORIZED" });
    }
}

export default AuthorizationMiddleware;
