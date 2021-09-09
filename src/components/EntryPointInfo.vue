<template>
    <div v-if="!entrypoints" class="text-sm info ports">
        <span>No entrypoints configured.</span>
    </div>
    <div v-else class="text-sm info entrypoint">
        <span
            >Entrypoint:
            <span v-for="item in entrypoints" :key="item.id">
                <span class="font-mono px-1 text-indigo-700"
                    >{{ item.commandText }}
                </span>
            </span>
        </span>
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
        entrypoints() {
            const entrypoints = this.image?.Config?.Entrypoint ?? false;
            return !entrypoints
                ? false
                : entrypoints.map((command, idx) => ({
                      commandText: command,
                      id: idx,
                  }));
        },
    },
};
</script>

<style scoped></style>
