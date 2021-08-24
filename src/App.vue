<template>
    <header>
        <h1>Tosbur</h1>
    </header>
    <section class="main-content">
        <sidebar-menu :state="state" @change-view="changeView"></sidebar-menu>
        <main-content
            class="content"
            :current-view="state.view"
            :images="imagesWithInfo"
            :image-inspections="state.imageInspect"
            :containers="state.containers"
            @start-container="startContainer"
            @attach-to-container="attachContainer"
        ></main-content>
    </section>
</template>

<script>
import { mocks } from './mocks';
import SidebarMenu from './components/SidebarMenu.vue';
import MainContent from './components/MainContent.vue';
import store from './store.js';

/**
Mock window.tosbur when in vite development mode
https://vitejs.dev/guide/env-and-mode.html#env-variables-and-modes
*/
if (import.meta.env.MODE === 'development') {
    window.tosbur = mocks;
} else if (import.meta.env.MODE === 'staging') {
    console.warn('Staging mode for Electron testing only.');
}
const { tosbur } = window;

export default {
    components: {
        SidebarMenu,
        MainContent,
    },
    data() {
        return store;
    },
    computed: {
        imagesWithInfo() {
            return this.state.images.map((image) => {
                const inspect = this.state.imagesInspect.find(
                    (i) => i.Id === image.Id
                );
                console.log('images computed ', inspect);
                return {
                    RepoTags: image.RepoTags,
                    Id: image.Id,
                    Size: image.Size,
                    Config: inspect?.Config,
                };
            });
        },
    },
    created() {
        // `this` points to the vm instance
        return tosbur
            .getDockerVersion()
            .then((f) => {
                console.log('Fetched docker version', f);
                store.setDockerVersion({ name: f.Version });
                return tosbur.getImages();
            })
            .then((images) => {
                console.log('Fetched images', images);
                store.setDockerImages(images);
                return images;
            })
            .then((images) => {
                const imageInspectPromises = images.map((i) =>
                    tosbur.getImageInspect(i.Id)
                );
                return Promise.all(imageInspectPromises).then((response) => {
                    store.setInspectImages(response);
                    return response;
                });
            })
            .then(tosbur.getContainers)
            .then((f) => {
                console.log('Fetched containers', f);
                store.setContainers(f);
                return;
            })
            .catch((e) => {
                console.error(e);
                console.error('Could not get docker version');
            });
    },
    methods: {
        changeView(view) {
            store.setView(view);
        },
        async startContainer(val) {
            console.log('Creating and starting container', val);
            const createContainer = await tosbur.createContainer({
                image: val,
            });
            return await tosbur.startContainer(createContainer);
        },
        async attachContainer(val) {
            console.log('Attaching to container', val);
            return tosbur
                .attachToContainer({ Id: val })
                .then((f) => {
                    console.log(f);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
    },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
body {
    @apply h-screen font-sans;
}
#app {
    @apply fixed inset-0 h-screen flex flex-col;
}
header {
    @apply flex px-4 py-1 h-8 items-center justify-center z-20 text-xs shadow-lg;
    min-height: 36px;
    background-color: #132c33;
}
header > h1 {
    color: #eee;
}
.main-content {
    @apply h-screen flex flex-row;
    background-color: #eeeeee;
}
.content {
    @apply w-full flex-grow;
    overflow-y: scroll;
}
.sidebar {
    @apply h-full overflow-hidden flex flex-col flex-shrink-0 justify-start text-cool-gray-100 items-center p-1 z-10 shadow py-4 border-r-1;
    width: 36px;
    min-width: 36px;
    background-color: #126e82;
    border-color: #132c33;
}
footer {
    @apply flex px-4 py-1 h-8 items-center justify-end z-20 shadow-2xl border-t-1 border-gray-900 border-opacity-80 text-xs;
    background-color: #132c33;
    color: #eee;
}
</style>
