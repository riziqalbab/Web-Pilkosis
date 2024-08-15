// /* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Request, Response } from "express";
import AdminMiddleware from '../Middleware/AdminMiddleware';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import UploadMiddleware from "../Middleware/UploadMiddleware";
import fs from 'fs';
// import uploadFile f
import PaslonModel from "../Models/PaslonModel";
import AuthorizationMiddleware from "../Middleware/AuthorizationMiddleware";

const router = express.Router();
router.use(cookieParser());

const paslon = new PaslonModel();

router.get("/paslon", AuthorizationMiddleware, async (req: Request, res: Response) => {
    try {
        const result = await paslon.All();
        res.status(200).json({
            message: "success",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to fetch data",
            error: err.message
        });
    }
});

router.post("/paslon", [AdminMiddleware, multer({ storage: UploadMiddleware.storage, fileFilter: UploadMiddleware.fileFilter }).single("img")], async (req: Request, res: Response) => {
    const nomor_urut = req.body.nomor_urut;
    const nama = req.body.nama;
    const caksis = req.body.caksis;
    const cawaksis = req.body.cawaksis;
    const visi = req.body.visi;
    const misi = req.body.misi;
    const img = req.file?.filename;

    if (!img) {
        return res.status(400).json({ message: "Image file is required" });
    }

    
    if (req.file) fs.readFile(req.file.path, async (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file", error: err.message });
        }

        try {
            const result = await uploadFile(data, img);
            const insertResult = await paslon.insert({ nomor_urut, nama, caksis, cawaksis, visi, misi, img: result });
            res.status(200).json({
                message: "success",
                data: insertResult
            });
        } catch (uploadError: any) {
            res.status(400).json({ message: "Failed to upload image", error: uploadError.message });
        }
    });
});

router.delete("/paslon", AdminMiddleware, async (req: Request, res: Response) => {
    const idPaslon = Number(req.query.idPaslon);

    if (isNaN(idPaslon)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const result = await paslon.dropById(idPaslon);
        res.status(200).json({
            message: "success",
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            message: "Failed to delete",
            error: err.message
        });
    }
});

export default router;
