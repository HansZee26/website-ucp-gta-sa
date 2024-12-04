import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router';
import { isAuthenticated, refreshToken } from '@/service/AuthServices';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/pages/empty',
                    name: 'empty',
                    component: () => import('@/views/pages/Empty.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },

        {
            path: '/auth/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('@/views/pages/auth/Register.vue')
        },
        {
            path: '/auth/logout',
            name: 'logout',
            component: () => import('@/views/pages/auth/Logout.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },
        {
            path: '/character/CharacterMenu',
            name: 'Character',
            component: () => import('@/views/pages/character/CharacterMenu.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    const requiresAuth = !['login', 'register', 'landing', 'accessDenied', 'error', 'notfound'].includes(to.name);
    
    if (requiresAuth && !isAuthenticated()) {
        // Jika pengguna mencoba mengakses halaman yang memerlukan autentikasi tapi belum login
        next({ name: 'landing' });
    } else if (to.name === 'login' && isAuthenticated()) {
        // Jika pengguna sudah login dan mencoba mengakses halaman login
        next({ name: 'dashboard' });
    } else {
        // Lanjutkan ke rute yang diminta
        next();
    }
});

export default router;
