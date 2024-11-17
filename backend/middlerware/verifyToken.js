import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader?.split(' ')[1]; // Periksa keberadaan authHeader dan ekstrak token

        if (!token) {
            return res.status(401).json({ msg: "Token tidak ditemukan!" });
        }

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: "Token tidak valid!" });
            }

            // Tambahkan informasi dari token ke `req` untuk akses berikutnya
            req.email = decoded.email;
            req.userId = decoded.userId; // Jika tersedia dalam token
            next();
        });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
