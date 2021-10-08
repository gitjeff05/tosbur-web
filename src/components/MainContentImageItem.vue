<template>
    <image-action-buttons
        :image="image"
        :configuring-image="configuringImage"
    />
    <!-- not configuring this image -->
    <div v-if="configuringId !== image.Id">
        <entry-point-info :image="image" data-testid="entrypoint" />
        <cmd-info :image="image" data-testid="cmd" />
        <exposed-ports-info :image="image" data-testid="ports" />
    </div>
    <!-- is configuring this image -->
    <div v-else>
        <button
            data-testid="cancel"
            class="
                text-sm text-purple-700
                button
                underline
                hover:text-purple-900
            "
            @click="$parent.$parent.$emit('cancel-configure-container')"
        >
            cancel
        </button>
        <editingConfiguration
            class="editing-configuration"
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

    emits: ['cancel-configure-container', 'start-container'],
    computed: {
        configuringId() {
            return this.configuringImage?.Id ?? false;
        },
    },
};
</script>

<style scoped></style>
