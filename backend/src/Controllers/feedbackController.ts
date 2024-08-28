import express, { Request, Response, Router } from 'express';
import FeedbackModel from '../Models/feedbackModel';


const router = express.Router();
const feedback = new FeedbackModel();

interface Feedback{
    id?: number;
    nama:string;
    kritik:string;
    saran:string;
}

router.post('/feedback', async (req:Request,res:Response)=>{
    const {nama, kritik, saran}= req.body;

    try {
        const insertResult = await feedback.insert({ nama,kritik,saran }) as Feedback;
        res.status(200).json({
            message: 'success',
            data: insertResult
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to insert data',
            error: err.message
        });
    }})

router.get('/feedback', async (req:Request, res:Response)=>{
    try {
        const feedbackresult = await feedback.All() as Feedback[];
        res.status(200).json({
            message: 'success',
            data: feedbackresult
        });
    } catch (err: any) {
        res.status(500).json({
            message: 'Failed to retrieve paslon data',
            error: err.message
        });
    }

})

export default router;