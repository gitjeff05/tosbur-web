<template>
    <header>
        <h1>Tosbur</h1>
    </header>
    <section class="main-content">
        <sidebar-menu :data="store"></sidebar-menu>
        <main-content class="content" :data="store.state"></main-content>
    </section>
    <footer>
        <h2>Footer</h2>
    </footer>
</template>

<script>
import { reactive } from 'vue';
import { mocks } from './mocks';
import SidebarMenu from './components/SidebarMenu.vue';
import MainContent from './components/MainContent.vue';

/**
Mock window.tosbur when in vite development mode
https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
*/
if (import.meta.env.MODE === 'development') {
    window.tosbur = mocks;
} else if (import.meta.env.MODE === 'staging') {
    console.warn('Staging mode for Electron testing only.');
}
const { tosbur } = window;

/**
Application state
*/
const store = {
    state: reactive({
        view: 'search',
        dockerVersion: {
            name: 'Harry',
        },
    }),
    setDockerVersion(newValue) {
        this.state.dockerVersion = newValue;
    },
    setView(newValue) {
        this.state.view = newValue;
    },
};

export default {
    components: {
        SidebarMenu,
        MainContent,
    },
    data() {
        return { store };
    },
    created() {
        // `this` points to the vm instance
        return tosbur
            .getDockerVersion()
            .then((f) => {
                console.log('fetched docker version', f);
                store.setDockerVersion({ name: f.Version });
            })
            .catch((e) => {
                console.error(e);
                console.error('Could not get docker version');
            });
    },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
body {
    @apply h-screen font-sans;
}
#app {
    @apply fixed inset-0 h-screen flex flex-col;
}
header {
    @apply flex px-4 py-1 h-8 items-center justify-center z-20 text-xs shadow-lg;
    min-height: 36px;
    background-color: #132c33;
}
header > h1 {
    color: #eee;
}
.main-content {
    @apply h-screen flex flex-row;
    background-color: #e5e5e5;
}
.content {
    @apply w-full flex-grow;
}
.sidebar {
    @apply h-full overflow-hidden flex flex-col flex-shrink-0 justify-start text-cool-gray-100 items-center w-16 p-1 z-10 shadow py-4 border-r-1;
    min-width: 48px;
    background-color: #126e82;
    border-color: #132c33;
}
footer {
    @apply flex px-4 py-1 h-8 items-center justify-end z-20 shadow-2xl border-t-1 border-gray-900 border-opacity-80 text-xs;
    background-color: #132c33;
    color: #eee;
}
</style>
