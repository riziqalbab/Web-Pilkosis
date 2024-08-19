import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

function AuthorizationMiddleware(req: Request, res: Response, next: NextFunction): void | Response {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "UNAUTHORIZED" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY as string, { algorithms: ["HS256"] }) as JwtPayload;
        next();
    } catch (err) {
        return res.status(401).json({ message: "UNAUTHORIZED", error: (err as Error).message });
    }
}

export default AuthorizationMiddleware;
