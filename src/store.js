import { reactive } from 'vue';

const store = {
    state: reactive({
        view: 'search',
        dockerVersion: { name: 'Harry' },
        imagesInspect: [],
        images: [],
        containers: [],
    }),
    setDockerVersion(newValue) {
        this.state.dockerVersion = newValue;
    },
    setDockerImages(newValue) {
        this.state.images = newValue;
    },
    setContainers(newValue) {
        this.state.containers = newValue;
    },
    setView(newValue) {
        this.state.view = newValue;
    },
    setInspectImages(newValue) {
        this.state.imagesInspect = newValue;
    },
};

export default store;
