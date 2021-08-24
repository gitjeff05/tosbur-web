<template>
    <main>
        <div v-if="currentView === 'images'">
            <h1 class="font-semibold text-xl">List of images</h1>
            <ul>
                <li
                    v-for="post in images"
                    :key="post.Id"
                    :title="post.Size"
                    class="flex flex-col bg-gray-50 shadow my-2 p-4 py-3"
                >
                    <div class="flex flex-row items-center justify-between">
                        <span class="flex w-2/3 justify-between">
                            <span>{{ post.RepoTags[0] }}</span
                            ><span> {{ computeSize(post.Size) }}</span></span
                        >
                        <button
                            class="image-container-action start-image"
                            @click="$emit('start-container', post.Id)"
                        >
                            start
                        </button>
                    </div>
                    <div
                        v-if="post.Config.Entrypoint ?? false"
                        class="text-sm info entrypoint"
                    >
                        <span
                            >Entrypoint:
                            <span class="font-mono text-indigo-700">{{
                                post.Config.Entrypoint.join(' ')
                            }}</span></span
                        >
                    </div>
                    <div
                        v-if="post.Config.Cmd ?? false"
                        class="text-sm info cmd"
                    >
                        <span
                            >Cmd:
                            <span class="font-mono text-indigo-700">{{
                                post.Config.Cmd.join(' ')
                            }}</span></span
                        >
                    </div>
                    <div
                        v-if="post.Config.ExposedPorts ?? false"
                        class="text-sm info ports"
                    >
                        <span
                            >ExposedPorts:
                            <span class="font-mono text-indigo-700">{{
                                post.Config.ExposedPorts
                            }}</span></span
                        >
                    </div>
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
                    <span class="flex flex-col">
                        <span>{{ post.State }}</span
                        ><span>{{ post.Status }}</span></span
                    >
                    <button
                        class="image-container-action attach-container"
                        @click="$emit('attach-to-container', post.Id)"
                    >
                        attach
                    </button>
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
    emits: ['start-container', 'attach-to-container'],
    setup(props) {
        onUpdated(() => {
            console.log(`Updated main with ${props.currentView}`);
            console.log(props.images);
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
    @apply h-screen p-6 pb-10;
}
.image-container-action {
    @apply text-sm p-1 px-3 text-cool-gray-200 inline-flex items-center;
}
.start-image {
    background-color: #132c33;
}
.attach-container {
    background-color: #132c33;
}
</style>
