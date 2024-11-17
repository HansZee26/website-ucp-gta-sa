import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Accounts from "../models/accounts.js";

export const getAccounts = async (req, res) => {
    try {
        const accounts = await Accounts.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(accounts);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const Register = async (req, res) => {
    const { name, email, password, confPassword } = req.body;

    if (!name || !email || !password || !confPassword) {
        return res.status(400).json({ msg: "Semua field wajib diisi!" });
    }

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password dan Confirm Password tidak sama!" });
    }

    try {
        const existingUser = await Accounts.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ msg: "Email sudah terdaftar!" });
        }

        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        await Accounts.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({ msg: "Register berhasil" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const Login = async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ msg: "Email dan Password wajib diisi!" });
        }

        const user = await Accounts.findOne({
            where: { email: req.body.email }
        });

        if (!user) {
            return res.status(404).json({ msg: "Email tidak ditemukan!" });
        }

        const match = await bcrypt.compare(req.body.password, user.password);
        if (!match) {
            return res.status(400).json({ msg: "Salah password!" });
        }

        const userId = user.id;
        const name = user.name;
        const email = user.email;

        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20m'
        });
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await Accounts.update({ refresh_token: refreshToken }, { where: { id: userId } });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 86400000 // 1 hari
            // secure: true // Aktifkan jika HTTPS
        });

        res.json({ accessToken });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export const Logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(204);

        const user = await Accounts.findOne({
            where: { refresh_token: refreshToken }
        });

        if (!user) return res.sendStatus(204);

        await Accounts.update({ refresh_token: null }, {
            where: { id: user.id }
        });

        res.clearCookie('refreshToken');
        res.sendStatus(200);
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};
