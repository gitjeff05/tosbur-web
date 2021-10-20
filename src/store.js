import { reactive } from 'vue';

const store = {
    state: reactive({
        dockerVersion: { name: 'Harry' },
        imagesInspect: [],
        images: [],
        containers: [],
        configuringImage: {},
        attachedContainer: {},
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
    setConfigImage(image) {
        this.state.configuringImage = image;
    },
    setAttachedContainer(image) {
        this.state.attachedContainer = image;
        this.state.view = 'attached';
    },
};

export default store;
