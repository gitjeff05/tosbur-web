<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Tosbur" :data="store" />
</template>

<script>
import { reactive } from 'vue';
import { mocks } from './mocks';
import HelloWorld from './components/HelloWorld.vue';

/**
Mock window.tosbur when in vite development mode
https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
*/
if (import.meta.env.MODE === 'development') {
    window.tosbur = mocks;
} else if (import.meta.env.MODE === 'staging') {
    console.warn(
        'App is in staging mode and meant to be tested in Electron. This will not work in a normal browser window.'
    );
}
const { tosbur } = window;

const store = {
    state: reactive({
        dockerVersion: {
            name: 'Harry',
        },
    }),
    setDockerVersion(newValue) {
        this.state.dockerVersion = newValue;
    },
};

export default {
    components: {
        HelloWorld,
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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
