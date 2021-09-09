<template>
    <div v-if="isConfiguring">
        <h1>hi, edit config here</h1>
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
};
</script>

<style scoped></style>
