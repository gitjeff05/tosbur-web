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
                    <image-action-buttons
                        :image="post"
                        :configuringImage="configuringImage"
                        @configure-container="configureContainer"
                    />
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
            <div class="inline-flex">
                <h1 class="font-semibold text-xl">Containers</h1>
                <button
                    class="ml-4 button image-container-action"
                    @click="$emit('refresh-containers')"
                >
                    Refresh
                </button>
            </div>
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
                        class="flex flex-row w-1/4 items-center justify-around"
                    >
                        <span>{{ post.Names[0] }}</span
                        ><span> {{ post.Id.slice(0, 10) }}</span>
                    </div>
                    <span class="flex flex-col pl-3 leading-5 w-1/4">
                        <span class="text-emerald-600">{{ post.State }}</span
                        ><span>{{ post.Status }}</span></span
                    >
                    <div
                        class="
                            container-actions
                            flex flex-row
                            w-1/2
                            button-group
                            justify-end
                        "
                    >
                        <button
                            class="image-container-action attach-container"
                            @click="$emit('attach-to-container', post.Id)"
                        >
                            attach
                        </button>
                        <button
                            class="list-processes image-container-action"
                            @click="
                                $emit('list-processes-in-container', post.Id)
                            "
                        >
                            list processes
                        </button>
                        <button
                            class="inspect-container image-container-action"
                            @click="$emit('inspect-container', post.Id)"
                        >
                            inspect
                        </button>
                        <button
                            class="container-logs image-container-action"
                            @click="$emit('container-logs', post.Id)"
                        >
                            logs
                        </button>
                        <button
                            class="image-container-action kill-container"
                            @click="$emit('kill-container', post.Id)"
                        >
                            kill
                        </button>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
import { onUpdated } from 'vue';
import ImageActionButtons from './ImageActionButtons.vue';
export default {
    components: { ImageActionButtons },
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
    emits: [
        'start-container',
        'attach-to-container',
        'kill-container',
        'refresh-containers',
        'list-processes-in-container',
        'inspect-container',
        'container-logs',
        'configure-container',
    ],
    setup(props) {
        onUpdated(() => {
            console.log(
                `Updated main with ${props.currentView} and ${props.configuringImage}`
            );
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
    methods: {
        async configureContainer(image) {
            console.log('emitted configuring container, bubble up');
            console.log(image);
            this.$emit('configure-container', image);
        },
    },
};
</script>

<style scoped>
main {
    @apply h-screen p-6 pb-10;
}

.attach-container {
    background-color: #132c33;
}
.container-actions button {
    @apply mr-2 px-6;
}
</style>
