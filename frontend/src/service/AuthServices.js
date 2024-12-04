import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true, // Kirim cookie refreshToken
});

export function isAuthenticated() {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        return !isExpired;
    } catch (e) {
        return false; // Jika token tidak valid
    }
}

export const login = async (email, password) => {
    const response = await api.post(import.meta.env.VITE_ENDPOINT_LOGIN, { email, password });
    return response.data; // Mengembalikan accessToken
};

export const register = async (name, email, password, confPassword) => {
    const response = await api.post(import.meta.env.VITE_ENDPOINT_REGISTER, {
        name,
        email,
        password,
        confPassword,
    });
    return response.data;
};

export async function logout() {
    
    await api.delete(import.meta.env.VITE_ENDPOINT_LOGOUT);
    // Hapus token dari localStorage
    localStorage.removeItem('accessToken');

    // Jika menggunakan cookie, hapus cookie (opsional)
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export const refreshToken = async () => {
    const response = await api.get(import.meta.env.VITE_ENDPOINT_REFRESH);
    return response.data; // Mengembalikan accessToken baru
};
