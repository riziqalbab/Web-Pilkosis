/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Router, Request, Response } from "express";
import PaslonModel from "../Models/PaslonModel";
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";
import cookieParser from 'cookie-parser';

const paslon = new PaslonModel();

const router = express.Router();
router.use(cookieParser());

router.post("/vote", AuthorizationMiddleware, async (req: Request, res: Response) => {
    const id = Number(req.query.id);

    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    try {
        const result = await paslon.vote(id);
        if (result.success) {
            res.status(200).json({
                message: "Success"
            });
        } else {
            res.status(500).json({
                message: "Failed to update vote",
                error: result.error
            });
        }
    } catch (err) {
        res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});

export default router;
