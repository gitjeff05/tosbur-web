<template>
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
            <div class="flex flex-row w-1/4 items-center justify-around">
                <span>{{ container.Names[0] }}</span
                ><span> {{ container.Id.slice(0, 10) }}</span>
            </div>
            <span class="flex flex-col pl-3 leading-5 w-1/4">
                <span class="text-emerald-600">{{ container.State }}</span
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
                    class="
                        bg-indigo-500
                        border-0
                        flex-shrink-0
                        text-white
                        py-2
                        px-6
                        image-container-action
                        attach-container
                        inline-flex
                        lg:mt-2
                        xl:mt-0
                        hover:bg-indigo-600
                        focus:outline-none
                    "
                    @click="$parent.$emit('attach-to-container', container.Id)"
                >
                    attach
                </button>
                <button
                    class="list-processes image-container-action"
                    @click="
                        $parent.$emit(
                            'list-processes-in-container',
                            container.Id
                        )
                    "
                >
                    list processes
                </button>
                <button
                    class="inspect-container image-container-action"
                    @click="$parent.$emit('inspect-container', container.Id)"
                >
                    inspect
                </button>
                <button
                    class="container-logs image-container-action"
                    @click="$parent.$emit('container-logs', container.Id)"
                >
                    logs
                </button>
                <button
                    class="image-container-action kill-container"
                    @click="$parent.$emit('kill-container', container.Id)"
                >
                    kill
                </button>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        containers: {
            type: Array,
            default: () => [],
            required: false,
        },
    },

    emits: [
        'refresh-containers',
        'attach-to-container',
        'kill-container',
        'list-processes-in-container',
        'inspect-container',
        'container-logs',
    ],
    setup() {
        return {};
    },
};
</script>

<style scoped>
.container-actions button {
    @apply mr-2 px-6;
}
</style>
