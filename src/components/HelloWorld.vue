<template>
    <h1>{{ msg }}</h1>
    <h2>{{ data.state.dockerVersion.name }}</h2>
    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank">
            Vite Documentation
        </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button type="button" @click="getDocker">get docker</button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
</template>

<script>
import { onMounted, onUpdated } from 'vue';
export default {
    props: {
        msg: {
            type: String,
            required: true,
            default: 'Tosbur Web Application',
        },
        data: {
            type: Object,
            default: () => ({ dockerVersion: { name: 'Jeff' } }),
            required: false,
        },
    },
    setup(props) {
        function getDocker() {
            props.data.setDockerVersion({ name: 'Greg' });
        }
        onMounted(() => {
            console.log('mounted!');
        });
        onUpdated(() => {
            console.log('updated!');
        });
        return {
            getDocker,
        };
    },
};
</script>

<style scoped>
a {
    color: #42b983;
}
</style>
