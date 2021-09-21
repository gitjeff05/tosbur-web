<template>
    <main>
        <div v-if="currentView === 'images'">
            <h1 class="font-semibold text-xl">List of images</h1>
            <ul>
                <li
                    v-for="image in images"
                    :key="image.Id"
                    :title="image.Size"
                    class="flex flex-col bg-gray-50 shadow my-2 p-4 py-3"
                >
                    <image-action-buttons
                        :image="image"
                        :configuring-image="configuringImage"
                        @configure-container="configureContainer"
                    />
                    <div v-if="configuringId !== image.Id">
                        <entry-point-info :image="image" />
                        <cmd-info :image="image" />
                        <exposed-ports-info :image="image" />
                    </div>
                    <div v-else>
                        <button
                            class="
                                text-sm text-purple-500
                                button
                                underline-dark-800
                            "
                            @click="$emit('cancel-configure-container')"
                        >
                            cancel
                        </button>
                    </div>
                    <editingConfiguration
                        :image="image"
                        :configuring-image="configuringImage"
                    />
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
                    v-for="container in containers"
                    :key="container.Id"
                    :title="container.Size"
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
                        <span>{{ container.Names[0] }}</span
                        ><span> {{ container.Id.slice(0, 10) }}</span>
                    </div>
                    <span class="flex flex-col pl-3 leading-5 w-1/4">
                        <span class="text-emerald-600">{{
                            container.State
                        }}</span
                        ><span>{{ container.Status }}</span></span
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
                            @click="$emit('attach-to-container', container.Id)"
                        >
                            attach
                        </button>
                        <button
                            class="list-processes image-container-action"
                            @click="
                                $emit(
                                    'list-processes-in-container',
                                    container.Id
                                )
                            "
                        >
                            list processes
                        </button>
                        <button
                            class="inspect-container image-container-action"
                            @click="$emit('inspect-container', container.Id)"
                        >
                            inspect
                        </button>
                        <button
                            class="container-logs image-container-action"
                            @click="$emit('container-logs', container.Id)"
                        >
                            logs
                        </button>
                        <button
                            class="image-container-action kill-container"
                            @click="$emit('kill-container', container.Id)"
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
import EntryPointInfo from './EntryPointInfo.vue';
import CmdInfo from './CmdInfo.vue';
import ExposedPortsInfo from './ExposedPortsInfo.vue';
import EditingConfiguration from './EditingConfiguration.vue';
export default {
    components: {
        ImageActionButtons,
        EntryPointInfo,
        CmdInfo,
        ExposedPortsInfo,
        EditingConfiguration,
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
    emits: [
        'start-container',
        'attach-to-container',
        'kill-container',
        'refresh-containers',
        'list-processes-in-container',
        'inspect-container',
        'container-logs',
        'configure-container',
        'cancel-configure-container',
    ],
    setup(props) {
        onUpdated(() => {
            console.log(
                `Updated main with ${props.currentView} and ${JSON.stringify(
                    props.configuringImage
                )}`
            );
            console.log(props.images);
        });
    },
    computed: {
        configuringId() {
            return this.configuringImage?.Id ?? false;
        },
    },
    methods: {
        async configureContainer(image) {
            // TODO - This is necessary because events don't bubble up to the parent container.
            // Is this intermediate event passing and anti-pattern?
            // Should we pass a function down or the store so that
            // this is not necessary?
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
