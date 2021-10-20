<template>
    <header>
        <h1>Tosbur</h1>
    </header>
    <section class="main-content">
        <sidebar-menu :state="state" @changeview="changeView"></sidebar-menu>
        <main-content
            class="content"
            :images="imagesWithInspections"
            :containers="state.containers"
            :configuring-image="state.configuringImage"
            @start-container="startContainer"
            @attach-to-container="attachContainer"
            @kill-container="killContainer"
            @refresh-containers="refreshContainers"
            @list-processes-in-container="listProcessesInContainer"
            @inspect-container="inspectContainer"
            @container-logs="getContainerLogs"
            @configure-container="configureContainer"
            @cancel-configure-container="cancelConfigureContainer"
        ></main-content>
    </section>
</template>

<script>
import { provide, ref } from 'vue';
import { mocks } from './mocks';
import SidebarMenu from './components/SidebarMenu.vue';
import MainContent from './components/MainContent.vue';
import store from './store.js';
import { buildImageRequest } from './api/utils.js';
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
    setup() {
        const currentView = ref('images');
        const updateView = (newValue) => {
            currentView.value = newValue;
        };
        provide('currentView', currentView);
        provide('updateView', updateView);
        return {
            currentView,
        };
    },
    data() {
        return store;
    },
    computed: {
        /**
         * This is a special aggregate array consisting of image data from
         * two objects in the store.
         * We pass this array to the MainContent component via the "images" prop.
         * The data is primarirly from the ImageList endpoint, but we also merge
         * in the `Config` object from ImageInspect:
         *
         * tosbur.getImages() -> /api/images/json?all=true -> store.setDockerImages()
         * tosbur.inspectImage() -> /api/images/${id}/json -> store.setInspectImages()
         *
         * Relevent API docs:
         *
         * https://docs.docker.com/engine/api/v1.41/#operation/ImageInspect
         * https://docs.docker.com/engine/api/v1.41/#operation/ImageList
         *
         */
        imagesWithInspections() {
            return this.state.images.map((image) => {
                const inspect = this.state.imagesInspect.find(
                    (i) => i.Id === image.Id
                );
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
            .then(async (images) => {
                const inspectedImagesPromises = images.map((i) =>
                    tosbur.inspectImage(i.Id)
                );
                const response = await Promise.all(inspectedImagesPromises);
                store.setInspectImages(response);
                return response;
            })
            .then(tosbur.getContainers)
            .then((f) => {
                console.log('Fetched containers', f);
                store.setContainers(f);
                return;
            })
            .catch((e) => {
                console.error(e);
                console.error(
                    'Could not complete setup requests in created() method in App instance'
                );
            });
    },

    methods: {
        async changeView(view) {
            const isAttachedContainer =
                Object.keys(this.state.attachedContainer).length !== 0;
            const isAttachedCurrentView = this.state.view === 'attached';
            const isAttemptingToSwitchToAttachedView = view === 'attached';
            if (
                isAttachedContainer &&
                isAttachedCurrentView &&
                !isAttemptingToSwitchToAttachedView
            ) {
                await tosbur.hideEmbeddedView(view);
            }
            if (
                isAttachedContainer &&
                !isAttachedCurrentView &&
                isAttemptingToSwitchToAttachedView
            ) {
                await tosbur.showEmbeddedView(view);
            }
            store.setView(view);
        },
        async configureContainer(val) {
            console.log('Configuring container', val);
            return store.setConfigImage(val);
        },
        async cancelConfigureContainer() {
            console.log('Cancel container configuration');
            return store.setConfigImage({});
        },
        async startContainer(configuration) {
            console.log('Creating and starting container');
            const imageRequest = buildImageRequest(configuration);
            const createContainer = await tosbur.createContainer(imageRequest);
            console.log(`container created ${createContainer}`);
            await tosbur.startContainer(createContainer);
            return this.refreshContainers();
        },
        async attachContainer(val) {
            console.log('Attaching to container', val);
            return tosbur
                .attachToContainer({ Id: val })
                .then((f) => {
                    console.log(`successfully attached container ${val}`);
                    store.setAttachedContainer(f);
                    console.log(f);
                })
                .catch((e) => {
                    console.error(e);
                });
        },
        async killContainer(val) {
            console.log('Killing container', val);
            const response = await tosbur.killContainer(val).then();
            console.log(response);
            return response;
        },
        async refreshContainers() {
            return tosbur
                .getContainers()
                .then((f) => {
                    console.log('Fetched containers', f);
                    store.setContainers(f);
                    return;
                })
                .catch((e) => {
                    console.error(e);
                    console.error('Could not fetch containers');
                });
        },
        async listProcessesInContainer(id) {
            return tosbur
                .listProcessesInContainer(id)
                .then((processes) => {
                    console.log('listing processes', processes);
                })
                .catch((e) => {
                    console.error('Could not get running processes', e);
                });
        },
        async inspectContainer(id) {
            return tosbur
                .inspectContainer(id)
                .then((container) => {
                    console.log('inspected container', container);
                })
                .catch((e) => {
                    console.error('Could not inspect container', e);
                });
        },
        async getContainerLogs(id) {
            return tosbur
                .getContainerLogs(id)
                .then((logs) => {
                    console.log('container logs', logs);
                })
                .catch((e) => {
                    console.error('Could not get container logs', e);
                });
        },
    },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
</script>

<style>
body {
    @apply font-sans h-screen;
}
#app {
    @apply flex flex-col h-screen inset-0 fixed;
}
header {
    @apply flex h-8 shadow-lg text-xs py-1 px-4 z-20 items-center justify-center;
    min-height: 36px;
    background-color: #132c33;
}
header > h1 {
    color: #eee;
}
.main-content {
    @apply flex flex-row h-screen;
    background-color: #eeeeee;
}
.content {
    @apply flex-grow w-full;
    overflow-y: scroll;
}
.sidebar {
    @apply flex flex-col h-full border-r-1 flex-shrink-0 shadow p-1 py-4 text-cool-gray-100 z-10 overflow-hidden justify-start items-center;
    width: 36px;
    min-width: 36px;
    background-color: #126e82;
    border-color: #132c33;
}
footer {
    @apply flex border-t-1 border-gray-900 border-opacity-80 h-8 text-xs py-1 px-4 shadow-2xl z-20 items-center justify-end;
    background-color: #132c33;
    color: #eee;
}
</style>
