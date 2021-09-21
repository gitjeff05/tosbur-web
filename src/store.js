import { reactive } from 'vue';

const store = {
    state: reactive({
        view: 'containers',
        dockerVersion: { name: 'Harry' },
        imagesInspect: [],
        images: [],
        containers: [],
        configuringImage: {},
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
        const imageObj = image?.Id ?? {};
        console.log(`setting configuringImage to ${imageObj} in store.`);
        this.state.configuringImage = image;
    },
};

export default store;
