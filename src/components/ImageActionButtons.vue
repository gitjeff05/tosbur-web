<template>
    <div class="flex flex-row items-center justify-between">
        <span class="flex w-2/3 justify-between">
            <span class="font-black text-xl text-cyan-900">{{
                image.RepoTags[0]
            }}</span>
            <span> {{ computeSize(image.Size) }}</span>
        </span>
        <button
            v-if="!isConfiguring"
            data-testid="start"
            :disabled="anotherImageIsBeingConfigured"
            class="
                bg-blue-500
                image-container-action
                sm:hover:bg-blue-700 sm:hover:text-cool-gray-50
            "
            @click="$parent.$parent.$parent.$emit('configure-container', image)"
        >
            Configure and start container
        </button>
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
    computed: {
        /**
         * If the configuringImage is set on the store
         * and it is not this image Id, return true
         */
        anotherImageIsBeingConfigured() {
            return (
                Object.keys(this.configuringImage).length !== 0 &&
                this.image.Id !== this.configuringImage.Id
            );
        },
        isConfiguring() {
            return (
                Object.keys(this.configuringImage).length !== 0 &&
                this.image.Id === this.configuringImage.Id
            );
        },
    },
    methods: {
        computeSize(size) {
            const sizeRounded = size / 1000000;
            return sizeRounded < 1000
                ? `${Number.parseFloat(sizeRounded).toFixed(2)} MB`
                : `${Number.parseFloat(size / 1000000000).toFixed(2)} GB`;
        },
    },
};
</script>

<style scoped>
.image-container-action {
    @apply text-sm p-2 px-3 text-cool-gray-200 inline-flex items-center;
}

.image-container-action:disabled {
    @apply cursor-not-allowed bg-gray-400;
}
</style>
