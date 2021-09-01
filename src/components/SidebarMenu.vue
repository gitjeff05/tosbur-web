<script>
import { computed } from 'vue';

export default {
    // just need state and view?
    props: {
        state: {
            type: Object,
            default: () => ({
                view: 'search',
                dockerVersion: { name: 'Jeff' },
            }),
            required: false,
        },
    },
    emits: ['changeview'],
    setup(props) {
        const isSearchActive = computed(() => props.state.view === 'search');
        const isImagesActive = computed(() => props.state.view === 'images');
        const isContainersActive = computed(
            () => props.state.view === 'containers'
        );
        return {
            isSearchActive,
            isImagesActive,
            isContainersActive,
        };
    },
};
</script>

<template>
    <aside class="sidebar">
        <button
            id="search"
            ref="searchBox"
            data-testid="search"
            class="icon"
            title="Search DockerHub"
            role="button"
            tab-index="0"
            :class="{ active: isSearchActive }"
            @click="$emit('changeview', 'search')"
        >
            <i-carbon-search />
        </button>

        <button
            id="images"
            data-testid="images"
            class="icon"
            title="View Container Images"
            role="button"
            tab-index="1"
            :class="{ active: isImagesActive }"
            @click="$emit('changeview', 'images')"
        >
            <i-carbon-image-service />
        </button>

        <button
            id="containers"
            data-testid="containers"
            class="icon"
            title="View Running Contianers"
            role="button"
            tab-index="2"
            :class="{ active: isContainersActive }"
            @click="$emit('changeview', 'containers')"
        >
            <i-carbon-container-software />
        </button>
    </aside>
</template>

<style scoped>
button.icon {
    @apply font-extrabold my-1 text-xl;
    width: 2.2rem;
    padding: 0.5rem 0.25rem;
    cursor: default;
}
button.icon:hover {
    background-color: #0a5869;
}
button.active,
button.active:hover {
    background-color: #132c33;
    outline: none;
    @apply shadow-xl  ring-offset-1 ring-opacity-80 ring-cyan-900;
}
</style>
