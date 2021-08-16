<template>
    <main>
        <div v-if="currentView === 'images'">
            <h1 class="font-semibold text-xl">List of images</h1>
            <ul>
                <li
                    v-for="post in images"
                    :key="post.Id"
                    :title="post.Size"
                    class="
                        flex flex-row
                        bg-gray-50
                        shadow
                        my-2
                        p-4
                        py-3
                        items-center
                        justify-between
                    "
                >
                    <span class="flex w-2/3 justify-between">
                        <span>{{ post.RepoTags[0] }}</span
                        ><span> {{ computeSize(post.Size) }}</span></span
                    >
                    <button
                        class="
                            text-sm
                            p-1
                            px-3
                            text-cool-gray-200
                            inline-flex
                            items-center
                            start-image
                        "
                        @click="doThings(post.Id)"
                    >
                        start
                    </button>
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
                    class="
                        flex flex-row
                        bg-gray-50
                        shadow
                        my-2
                        p-4
                        py-3
                        items-center
                        justify-between
                    "
                >
                    <div
                        class="flex flex-row w-3/4 items-center justify-between"
                    >
                        <span>{{ post.Names[0] }}</span
                        ><span> {{ post.Image }}</span>
                    </div>
                    <span> {{ post.State }}</span>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import { onUpdated } from 'vue';
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                state: { view: 'images', dockerVersion: { name: 'Jeff' } },
            }),
            required: false,
        },
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
        const doThings = (id) => {
            props.data.startContainer(id);
        };
        const computeSize = (size) => {
            const sizeRounded = size / 1000000;
            return sizeRounded < 1000
                ? `${Number.parseFloat(sizeRounded).toFixed(2)} MB`
                : `${Number.parseFloat(size / 1000000000).toFixed(2)} GB`;
        };
        return { computeSize, doThings };
    },
};
</script>

<style scoped>
main {
    @apply h-screen p-6;
}
.start-image {
    background-color: #132c335c;
}
</style>
