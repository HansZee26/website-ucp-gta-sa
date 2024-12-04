<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import { ref } from 'vue';
import axios from 'axios';

const name = ref('');
const email = ref('');
const password = ref('');
const confPassword = ref('');
const isLoading = ref(false);
const errorMsg = ref('');
const successMsg = ref('');

const register = async () => {
    errorMsg.value = ''; // Reset error message
    successMsg.value = ''; // Reset success message
    isLoading.value = true; // Set loading state

    // Validasi password dan konfirmasi
    if (password.value !== confPassword.value) {
        errorMsg.value = 'Password dan Konfirmasi Password tidak cocok.';
        isLoading.value = false;
        return;
    }

    try {
        const response = await axios.post(import.meta.env.VITE_ENDPOINT_REGISTER, {
            name: name.value,
            email: email.value,
            password: password.value,
            confPassword: confPassword.value
        });

        // Tampilkan pesan sukses
        successMsg.value = response.data.msg || 'Registrasi berhasil!';
    } catch (error) {
        // Tangani error
        errorMsg.value =
            error.response?.data?.msg || 'Terjadi kesalahan pada server.';
        console.error('Register error:', error);
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
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 100%)"
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
                            Welcome to Example Roleplay!
                        </div>
                        <span class="text-muted-color font-medium">Create an account to continue</span>
                    </div>

                    <div>
                        <!-- name Field -->
                        <label
                            for="name1"
                            class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2"
                        >
                            name
                        </label>
                        <InputText
                            id="name1"
                            type="text"
                            placeholder="name"
                            class="w-full md:w-[30rem] mb-8"
                            v-model="name"
                        />
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

                        <!-- Confirm Password Field -->
                        <label
                            for="confPassword"
                            class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2"
                        >
                            Confirm Password
                        </label>
                        <Password
                            id="confPassword"
                            v-model="confPassword"
                            placeholder="Confirm Password"
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

                        <!-- Success Message -->
                        <p
                            v-if="successMsg"
                            class="text-green-500 text-sm font-medium mb-4"
                        >
                            {{ successMsg }}
                        </p>

                        <!-- Register Button -->
                        <Button
                            label="Register"
                            class="w-full"
                            :disabled="isLoading"
                            @click="register"
                        >
                            {{ isLoading ? 'Registering...' : 'Register' }}
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
