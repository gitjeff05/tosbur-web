<template>
    <main>
        <div v-if="data.view === 'images'">
            <h1>List</h1>
        </div>
        <div v-else-if="data.view === 'search'">
            <h1>Search</h1>
        </div>
    </main>
</template>

<script>
import { onMounted } from 'vue';
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                view: 'list',
                dockerVersion: { name: 'Jeff' },
            }),
            required: false,
        },
    },
    setup(props) {
        onMounted(() => {
            console.log('mounted main');
            console.log(props);
            console.log(props.data);
            console.log(props.data.state);
        });
        return;
    },
};
</script>

<style scoped>
main {
    @apply h-screen;
}
</style>
