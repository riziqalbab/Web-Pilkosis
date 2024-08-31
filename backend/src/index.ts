import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';
import { Server } from 'socket.io';

// IMPORT CONTROLLERS
import login from "./Controllers/authController";
import tokenController from './Controllers/AccessTokenController';
import voteController from './Controllers/voteController';
import paslonController from './Controllers/PaslonController';
import feedback from './Controllers/feedbackController';
// import paslonModel from './Models/PaslonModel';
import PaslonModel from "./Models/PaslonModel";

const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Replace with your frontend's origin or keep '*' for all origins
        methods: ['GET', 'POST'],
        credentials: true,
        
    }
});

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's origin or keep '*' for all origins
    methods: ['GET', 'POST'],
    credentials: true,
    
}));
app.use(cookieParser());

// Setup your routes
app.get("/", (req, res) => {
    res.json({
        hello: "World",
        message: "Masukan endpoint API yang valid"
    });
});

app.use("/api", login);
app.use("/api", tokenController);
app.use("/api", voteController);
app.use("/api", paslonController);
app.use("/api", feedback);

// Setup Socket.io
const paslon = new PaslonModel();

interface PaslonData {
    id?: number;
    nomor_urut: string;
    nama: string;
    caksis: string;
    cawaksis: string;
    visi: string;
    misi: string;
    program_kerja: string;
    img: string;
    total?: number; // Tambahkan jika 'total' adalah bagian dari data paslon
}

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    const emitPaslonData = async () => {
        try {
            const paslons = await paslon.All() as PaslonData[];
            socket.emit('updatePaslonData', paslons);
        } catch (err: any) {
            socket.emit('error', {
                message: 'Failed to retrieve paslon data',
                error: err.message
            });
        }
    };

    // Emit data awal saat user terhubung
    emitPaslonData();

    // Emit data secara berkala (misalnya setiap 5 detik)
    const intervalId = setInterval(emitPaslonData, 60000);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        clearInterval(intervalId);
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
