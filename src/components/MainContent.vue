<template>
    <main>
        <div v-if="currentView === 'images'">
            <MainContentImageList
                :images="images"
                :configuring-image="configuringImage"
            />
        </div>
        <div v-else-if="currentView === 'search'">
            <h1 class="font-semibold text-xl">Search</h1>
        </div>
        <div v-else-if="currentView === 'containers'">
            <MainContentContainerList :containers="containers" />
        </div>
    </main>
</template>

<script>
import { onUpdated } from 'vue';
import MainContentImageList from './MainContentImageList.vue';
import MainContentContainerList from './MainContentContainerList.vue';
export default {
    components: {
        MainContentContainerList,
        MainContentImageList,
    },
    props: {
        currentView: {
            type: String,
            default: 'list',
            required: false,
        },
        images: {
            type: Array,
            default: () => {
                return [];
            },
            required: false,
        },
        containers: {
            type: Array,
            default: () => {
                return [];
            },
            required: false,
        },
        configuringImage: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    setup(props) {
        onUpdated(() => {
            console.log(
                `Switched view to ${
                    props.currentView
                } and configuring ${JSON.stringify(props.configuringImage)}`
            );
        });
    },
};
</script>

<style scoped>
main {
    @apply h-screen p-6 pb-10;
}
</style>
