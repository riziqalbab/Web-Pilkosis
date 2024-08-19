import express, { Router, Response } from "express";
import PaslonModel from "../Models/PaslonModel";
import VotedModel from "../Models/VotedModel";
import AuthorizationMiddleware, { CustomRequest } from "../Middleware/AuthorizationMiddleware";
import cookieParser from 'cookie-parser';

const paslon = new PaslonModel();
const votedModel = new VotedModel();
const router = express.Router();
router.use(cookieParser());

router.post("/vote", AuthorizationMiddleware, async (req: CustomRequest, res: Response) => {
    const paslonId = Number(req.query.id); 
    const userId = Number(req.user?.id); 


    if (!userId || isNaN(paslonId)) {
        return res.status(400).json({
            message: "Invalid ID or user not authenticated"
        });
    }

    try {
        const existingVote = await votedModel.Find({ user_id: userId });
        if (existingVote.length > 0) {
            return res.status(400).json({
                message: "User has already voted"
            });
        }

        const result = await votedModel.insert({ user_id: userId, paslon_id: paslonId });
        return res.status(200).json({
            message: "Vote cast successfully",
            result: result 
        });
    } catch (err: any) {
        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });
    }
});
export default router;