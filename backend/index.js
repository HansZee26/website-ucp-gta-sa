import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/database.js"; // Koneksi database
import router from "./routes/index.js";

dotenv.config();

const app = express();

// Periksa koneksi database
(async () => {
    try {
        await db.authenticate(); // Pastikan `authenticate()` sesuai dengan library database Anda
        console.log("Koneksi ke database berhasil");
    } catch (error) {
        console.error("Koneksi ke database gagal:", error);
    }
})();

// Middleware
app.use(cors({
    credentials: true,               // Izinkan cookie/credentials
    origin: process.env.FRONTEND_HOST // Izinkan hanya frontend tertentu
}));
app.use(cookieParser());
app.use(express.json());

// Routing
app.use(router);

// Port dinamis (default: 5000)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server berjalan di port ${PORT}`));
