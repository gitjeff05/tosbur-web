<template>
    <h1>{{ msg }}</h1>
    <h2>{{ data.state.dockerVersion.name }}</h2>

    <button type="button" @click="getDocker">get docker</button>
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
