<template>
    <div v-if="!exposedPorts" class="text-sm info ports">
        <span>No exposed ports configured. </span>
    </div>
    <div v-else class="text-sm info ports">
        <span
            >ExposedPorts:
            <span class="font-mono text-indigo-700">{{
                exposedPorts
            }}</span></span
        >
    </div>
</template>

<script>
export default {
    props: {
        image: {
            type: Object,
            default: () => ({}),
        },
    },
    computed: {
        exposedPorts() {
            const ports = this.image?.Config?.ExposedPorts ?? false;
            return !ports ? false : Object.keys(ports).join(' ');
        },
    },
};
</script>

<style scoped></style>
