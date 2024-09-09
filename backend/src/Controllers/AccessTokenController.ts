import express, { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import UserModel from "../Models/User";
import cors from 'cors';

dotenv.config();

const router = express.Router();
router.use(cookieParser());

router.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

const usermodel = new UserModel();

router.get("/token", async (req: Request, res: Response) => {
    const token = req.cookies.rfrsh;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const verify = jwt.verify(token, process.env.SECRET_KEY as string, { algorithms: ["HS256"] }) as JwtPayload;
        const username = verify.username;

        const user = await usermodel.Find({ nis: username });

        if (user.length === 0) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userData = user[0];
        if (!userData || !userData.id) {
            return res.status(500).json({ message: "User data is incomplete" });
        }

        const accessToken = jwt.sign({
            username: username,
            id: userData.id, 
            role: userData.role_user 
        }, process.env.SECRET_KEY as string, { expiresIn: "20m", algorithm: "HS256" });

       
        res.send({
            accessToken: accessToken,
            data: {
                nama: userData.nama,
                username: userData.username,
                role: userData.role_user
            }
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(401).json({ message: "Unauthorized" });
    }
});

export default router;
