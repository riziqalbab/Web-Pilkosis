import express, { Request, Response } from 'express';
import multer from 'multer';
import UploadMiddleware from '../Middleware/UploadMiddleware';
import AdminMiddleware from '../Middleware/AdminMiddleware';
import AuthorizationMiddleware from '../Middleware/AuthorizationMiddleware';
import PaslonModel from '../Models/PaslonModel';
import fs from 'fs';

const router = express.Router();
const upload = multer({ storage: UploadMiddleware.storage, fileFilter: UploadMiddleware.fileFilter });
const paslon = new PaslonModel();

router.post('/paslon', [AdminMiddleware, upload.single('img')], async (req: Request, res: Response) => {
    const { nomor_urut, nama, caksis, cawaksis, visi, misi } = req.body;
    const img = req.file?.filename;

    if (!img) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    try {
        const insertResult = await paslon.insert({ nomor_urut, nama, caksis, cawaksis, visi, misi, img });
        res.status(200).json({
            message: 'success',
            data: insertResult
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to insert data',
            error: err.message
        });
    }
});
router.get('/paslon',  async (req: Request, res: Response) => {
    try {
        const result = await paslon.All();
        res.status(200).json({
            message: 'success',
            data: result
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to fetch data',
            error: err.message
        });
    }
});
router.delete('/paslon/:id', AdminMiddleware, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    try {
        const result = await paslon.dropById(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paslon not found' });
        }
        res.status(200).json({ message: 'Paslon deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: 'Failed to delete paslon', error: err.message });
    }
});


export default router;
