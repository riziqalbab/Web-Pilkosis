import express, { Request, Response } from 'express';
import uploadMiddleware from '../Middleware/UploadMiddleware';
import AdminMiddleware from '../Middleware/AdminMiddleware';
import PaslonModel from '../Models/PaslonModel';

const router = express.Router();
const paslon = new PaslonModel();

interface PaslonData {
    id?: number;
    nomor_urut: string;
    nama: string;
    caksis: string;
    cawaksis: string;
    visi: string;
    misi: string;
    img: string;
}

// Endpoint POST /paslon
router.post('/paslon', [AdminMiddleware, uploadMiddleware.single('img')], async (req: Request, res: Response) => {
    const { nomor_urut, nama, caksis, cawaksis, visi, misi } = req.body;
    const img = req.file?.filename;

    if (!img) {
        return res.status(400).json({ message: 'Image file is required' });
    }

    try {
        const insertResult = await paslon.insert({ nomor_urut, nama, caksis, cawaksis, visi, misi, img }) as PaslonData;
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

// Endpoint GET /paslon (Get all Paslon)
router.get('/paslon', async (req: Request, res: Response) => {
    try {
        const paslons = await paslon.All() as PaslonData[];
        res.status(200).json({
            message: 'success',
            data: paslons
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to retrieve paslon data',
            error: err.message
        });
    }
});

// Endpoint DELETE /paslon/:id
router.delete('/paslon/:id', AdminMiddleware, async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }

    try {
        const result = await paslon.dropById(id) as { affectedRows: number };
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Paslon not found' });
        }
        res.status(200).json({ message: 'Paslon deleted successfully' });
    } catch (err: any) {
        res.status(500).json({ message: 'Failed to delete paslon', error: err.message });
    }
});

export default router;
