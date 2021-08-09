<template>
    <main>
        <div v-if="currentView === 'images'">
            <h1 class="font-semibold text-xl">List of images</h1>
            <ul>
                <li
                    v-for="post in images"
                    :key="post.Id"
                    :title="post.Size"
                    class="flex flex-row bg-gray-50 shadow my-2 p-4 py-3 items-center justify-between"
                >
                    <span>{{ post.RepoTags[0] }}</span
                    ><span> {{ computeSize(post.Size) }}</span>
                </li>
            </ul>
        </div>
        <div v-else-if="currentView === 'search'">
            <h1 class="font-semibold text-xl">Search</h1>
        </div>
        <div v-else-if="currentView === 'containers'">
            <h1 class="font-semibold text-xl">Containers</h1>
            <ul>
                <li
                    v-for="post in containers"
                    :key="post.Id"
                    :title="post.Size"
                    class="flex flex-row bg-gray-50 shadow my-2 p-4 py-3 items-center justify-between"
                >
                    <div
                        class="flex flex-row w-3/4 items-center justify-between"
                    >
                        <span>{{ post.Names[0] }}</span
                        ><span> {{ post.Image }}</span>
                    </div>
                    <span> {{ post.Status }}</span>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import { onUpdated } from 'vue';
export default {
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
    },
    setup(props) {
        onUpdated(() => {
            console.log(`Updated main with ${props.currentView}`);
        });
        const computeSize = (size) => {
            const sizeRounded = size / 1000000;
            return sizeRounded < 1000
                ? `${Number.parseFloat(sizeRounded).toFixed(2)} MB`
                : `${Number.parseFloat(size / 1000000000).toFixed(2)} GB`;
        };
        return { computeSize };
    },
};
</script>

<style scoped>
main {
    @apply h-screen p-6;
}
</style>
