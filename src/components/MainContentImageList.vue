<template>
    <h1 class="font-semibold text-xl">List of images</h1>
    <ul>
        <li
            v-for="image in images"
            :key="image.Id"
            :title="image.Size"
            class="flex flex-col bg-gray-50 shadow my-2 p-4 py-3 image-item"
            :class="isConfiguring(image.Id) ? 'active' : ''"
        >
            <main-content-image-item
                :image="image"
                :configuring-image="configuringImage"
            ></main-content-image-item>
        </li>
    </ul>
</template>

<script>
import MainContentImageItem from './MainContentImageItem.vue';
export default {
    components: {
        MainContentImageItem,
    },
    props: {
        images: {
            type: Array,
            default: () => {
                return [];
            },
            required: true,
        },
        configuringImage: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    methods: {
        isConfiguring(id) {
            return id === this.configuringImage.Id ? true : false;
        },
    },
};
</script>

<style scoped>
.image-item {
    height: 120px;
    transition: height 0.6s ease-in-out 0.1s;
}
.image-item.active {
    height: 360px;
}
</style>
