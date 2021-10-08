<template>
    <div
        class="flex flex-wrap items-center"
        :class="initialShow ? 'config-show' : 'config-hide'"
    >
        <div class="p-2 w-1/3 align-middle">
            <label for="path" class="text-sm text-gray-600 leading-7"
                >Mount Path</label
            ><input
                id="path"
                v-model.trim="mountPath.pathString"
                type="text"
                name="path"
                class="config-input config-mountpath"
                @keyup="validatePath"
            />
            <span
                class="text-sm w-full px-2 block"
                :class="mountPath.valid ? 'text-green-900' : 'text-red-900'"
                >{{ mountPath.pathString }}</span
            >
            <label for="entrypoint" class="text-sm text-gray-600 leading-7"
                >Entrypoint</label
            ><input
                id="entrypoint"
                v-model.trim="entryPoint.edited"
                :placeholder="entryPoint.original?.join(' ')"
                type="text"
                name="entrypoint"
                class="config-input"
            />
            <label for="cmd" class="text-sm text-gray-600 leading-7"
                >Commands</label
            ><input
                id="cmd"
                v-model.trim="cmd.edited"
                :placeholder="cmd.original?.join(' ')"
                type="text"
                name="cmd"
                class="config-input"
            />
        </div>
        <div class="p-2 w-1/3">
            <label class="inline-flex items-center">
                <input type="checkbox" checked="" />
                <span class="ml-2 w-1/2"
                    >Automatically remove the container when it exits?
                </span>
            </label>
        </div>
        <div class="p-2 w-1/3">
            <button
                class="
                    bg-blue-500 border-0 flex-shrink-0 text-white
                    p-2 px-3
                    lg:mt-2
                    xl:mt-0
                    focus:outline-none
                    sm:hover:bg-blue-700
                    sm:hover:text-cool-gray-50
                "
                @click="
                    $parent.$parent.$emit('start-container', {
                        mountPath,
                        entryPoint,
                        cmd,
                        image,
                    })
                "
            >
                Start Container
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        configuringImage: {
            type: Object,
            default: () => {
                return {};
            },
        },
        image: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    data() {
        return {
            mountPath: {
                pathString: '',
                valid: false,
            },
            entryPoint: {
                original: [],
                edited: null,
            },
            cmd: {
                original: [],
                edited: null,
            },
            timeout: null,
            initialShow: false,
        };
    },
    created() {
        const config = this?.configuringImage?.Config;
        const entrypoint = config?.Entrypoint;
        this.entryPoint.original = entrypoint;
        this.cmd.original = config?.Cmd ?? null;
        // Delay the initial view of this component
        // so the parent has enough time to complete
        // its height expanding animation
        setTimeout(() => {
            this.initialShow = true;
        }, 300);
    },
    methods: {
        validatePath() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                console.log(`Checking access to ${this.mountPath.pathString}`);
                tosbur
                    .isPathValid(this.mountPath.pathString)
                    .then(() => {
                        this.mountPath.valid = true;
                    })
                    .catch((e) => {
                        console.warn(e);
                        this.mountPath.valid = false;
                    });
            }, 1000);
        },
    },
};
</script>

<style scoped>
.config-input {
    @apply text-base w-full py-1 px-3 text-gray-900 leading-8 
        focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200;
}
.config-hide {
    opacity: 0;
}
.config-show {
    opacity: 1;
    transition: opacity 0.5s linear;
}
</style>
