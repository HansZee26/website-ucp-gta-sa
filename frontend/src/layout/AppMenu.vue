<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        items: [
            { label: 'Character', icon: 'pi pi-fw pi-id-card', to: '/character/CharacterMenu' },
            { label: 'Donation', icon: 'pi pi-fw pi-check-square', to: '/donation' },
            { label: 'Pengaturan', icon: 'pi pi-fw pi-check-square', to: '/settings' },
            { label: 'Keluar', icon: 'pi pi-fw pi-check-square', to: '/auth/Logout' },
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
