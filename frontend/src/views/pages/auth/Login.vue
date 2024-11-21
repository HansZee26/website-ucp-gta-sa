<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const checked = ref(false);
const isLoading = ref(false);
const errorMsg = ref('');

const login = async () => {
    errorMsg.value = ''; // Reset error message
    isLoading.value = true; // Set loading state

    try {
        const response = await axios.post(import.meta.env.VITE_ENDPOINT_LOGIN, {
            email: email.value,
            password: password.value,
        });

        // Simpan token ke localStorage
        localStorage.setItem('accessToken', response.data.accessToken);
        window.location.href = '/'; // Redirect setelah login berhasil
    } catch (error) {
        // Tangani error
        errorMsg.value =
            error.response?.data?.msg || 'Terjadi kesalahan pada server.';
        console.error('Login error:', error);
    } finally {
        isLoading.value = false; // Reset loading state
    }
};
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)"
            >
                <div
                    class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20"
                    style="border-radius: 53px"
                >
                    <div class="text-center mb-8">
                        <!-- Header -->
                        <svg
                            viewBox="0 0 54 40"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            class="mb-8 w-16 shrink-0 mx-auto"
                        >
                            <!-- SVG Path -->
                        </svg>
                        <div
                            class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
                        >
                            Welcome to PrimeLand!
                        </div>
                        <span class="text-muted-color font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <!-- Email Field -->
                        <label
                            for="email1"
                            class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                        >
                            Email
                        </label>
                        <InputText
                            id="email1"
                            type="text"
                            placeholder="Email address"
                            class="w-full md:w-[30rem] mb-8"
                            v-model="email"
                        />

                        <!-- Password Field -->
                        <label
                            for="password1"
                            class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                        >
                            Password
                        </label>
                        <Password
                            id="password1"
                            v-model="password"
                            placeholder="Password"
                            :toggleMask="true"
                            class="mb-4"
                            fluid
                            :feedback="false"
                        ></Password>

                        <!-- Error Message -->
                        <p
                            v-if="errorMsg"
                            class="text-red-500 text-sm font-medium mb-4"
                        >
                            {{ errorMsg }}
                        </p>

                        <!-- Remember Me -->
                        <div
                            class="flex items-center justify-between mt-2 mb-8 gap-8"
                        >
                            <div class="flex items-center">
                                <Checkbox
                                    v-model="checked"
                                    id="rememberme1"
                                    binary
                                    class="mr-2"
                                ></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <span
                                class="font-medium no-underline ml-2 text-right cursor-pointer text-primary"
                            >
                                Forgot password?
                            </span>
                        </div>

                        <!-- Login Button -->
                        <Button
                            label="Sign In"
                            class="w-full"
                            :disabled="isLoading"
                            @click="login"
                        >
                            {{ isLoading ? 'Signing In...' : 'Sign In' }}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
