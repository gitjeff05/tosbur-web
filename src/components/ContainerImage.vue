<template>
    <image-action-buttons
        :image="image"
        :configuring-image="configuringImage"
        @configure-container="configureContainer"
    />
    <div v-if="configuringId !== image.Id">
        <entry-point-info :image="image" data-testid="entrypoint" />
        <cmd-info :image="image" data-testid="cmd" />
        <exposed-ports-info :image="image" data-testid="ports" />
    </div>
    <div v-else>
        <button
            data-testid="cancel"
            class="text-sm text-purple-500 button underline-dark-800"
            @click="$emit('cancel-configure-container')"
        >
            cancel
        </button>
        <editingConfiguration
            :image="image"
            :configuring-image="configuringImage"
        />
    </div>
</template>

<script>
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
        image: {
            type: Object,
            default: () => {
                return {};
            },
        },
        configuringImage: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },

    emits: [
        'configure-container',
        'cancel-configure-container',
        'start-container',
    ],
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

<style lang="scss" scoped></style>
