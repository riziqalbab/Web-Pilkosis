import express, { Router, Request, Response } from "express";
import PaslonModel from "../Models/PaslonModel";
import VotedModel from "../Models/VotedModel"; // Pastikan model ini diimport
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";
import cookieParser from 'cookie-parser';

const paslon = new PaslonModel();
const votedModel = new VotedModel(); // Instansiasi model Voted
const router = express.Router();
router.use(cookieParser());

router.post("/vote", AuthorizationMiddleware, async (req: Request, res: Response) => {
    const paslonId = Number(req.query.id);
    const userId = req.user.id; 

    if (isNaN(paslonId)) {
        return res.status(400).json({
            message: "Invalid ID"
        });
    }

    try {
        const existingVote = await votedModel.Find({ user_id: userId });
        if (existingVote.length > 0) {
            return res.status(400).json({
                message: "User has already voted"
            });
        }
        const result = await paslon.vote(paslonId);
        if (result.success) {
            await votedModel.insert({ user_id: userId, paslon_id: paslonId });
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
