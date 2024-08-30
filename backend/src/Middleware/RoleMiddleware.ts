// RoleMiddleware.ts
import { Request, Response, NextFunction } from "express";
import { CustomRequest } from "./AuthorizationMiddleware";

const RoleMiddleware = (roles: string[]) => (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

if (userRole && roles.includes(userRole)) {
        return next();
    }

    return res.status(403).json({
        message: "Access forbidden: Insufficient permissions"
    });
};

export default RoleMiddleware;
