import express from "express";
import { getAccounts, Register, Login, Logout } from "../controllers/accounts.js";
import { verifyToken } from "../middlerware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";
const router = express.Router();

router.get('/accounts', verifyToken, getAccounts);
router.post('/register', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;
