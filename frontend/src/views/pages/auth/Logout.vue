<script setup>
import { logout } from '@/service/AuthServices.js';
import { useRouter } from 'vue-router';

const router = useRouter();

const handleLogout = () => {
    // Panggil fungsi logout
    logout();

    // Redirect ke halaman login
    router.push({ name: 'landing' });
};
</script>

<template>
    <header>
        <nav>
            <ul>
                <li><router-link to="/">Home</router-link></li>
                <li><button @click="handleLogout">Logout</button></li>
            </ul>
        </nav>
    </header>
</template>
