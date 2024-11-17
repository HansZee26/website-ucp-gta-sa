import jwt from "jsonwebtoken";
import Accounts from "../models/accounts.js";

export const refreshToken = async (req, res) => {
    try {
        // Ambil refresh token dari cookie
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);

        // Cari user berdasarkan refresh token
        const user = await Accounts.findOne({
            where: { refresh_token: refreshToken }
        });
        if (!user) return res.sendStatus(403);

        // Verifikasi refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) return res.sendStatus(403);

            // Buat access token baru
            const userId = user.id;
            const name = user.name;
            const email = user.email;
            const accessToken = jwt.sign(
                { userId, name, email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' } // Sesuaikan durasi
            );

            // Kirimkan access token baru
            res.json({ accessToken });
        });
    } catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
