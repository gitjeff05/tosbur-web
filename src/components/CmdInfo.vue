<template>
    <div v-if="!commands" class="text-sm info ports">
        <span>No commands configured.</span>
    </div>
    <div v-else class="text-sm info cmd">
        <span
            >Cmd:
            <span v-for="item in commands" :key="item.id">
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
        commands() {
            const commands = this.image?.Config?.Cmd ?? false;
            return !commands
                ? false
                : commands.map((command, idx) => ({
                      commandText: command,
                      id: idx,
                  }));
        },
    },
};
</script>

<style scoped></style>
