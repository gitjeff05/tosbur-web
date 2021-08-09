<template>
    <aside class="sidebar">
        <button
            id="search"
            ref="searchBox"
            class="icon"
            role="button"
            tab-index="0"
            @click="setSearchView"
        >
            <svg
                id="footer-sample-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 36"
                class="iconify iconify--clarity"
            >
                <path
                    class="clr-i-outline clr-i-outline-path-1"
                    d="M16.33 5.05A10.95 10.95 0 1 1 5.39 16A11 11 0 0 1 16.33 5.05m0-2.05a13 13 0 1 0 13 13a13 13 0 0 0-13-13z"
                    fill="currentColor"
                ></path>
                <path
                    class="clr-i-outline clr-i-outline-path-2"
                    d="M35 33.29l-7.37-7.42l-1.42 1.41l7.37 7.42A1 1 0 1 0 35 33.29z"
                    fill="currentColor"
                ></path>
            </svg>
        </button>

        <button class="icon" role="button" tab-index="1" @click="setImagesView">
            <svg
                id="footer-sample-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 36"
                class="iconify iconify--clarity"
            >
                <circle
                    cx="5.21"
                    cy="9.17"
                    r="2"
                    class="clr-i-outline clr-i-outline-path-1"
                    fill="currentColor"
                ></circle>
                <circle
                    cx="5.21"
                    cy="17.17"
                    r="2"
                    class="clr-i-outline clr-i-outline-path-2"
                    fill="currentColor"
                ></circle>
                <circle
                    cx="5.21"
                    cy="25.17"
                    r="2"
                    class="clr-i-outline clr-i-outline-path-3"
                    fill="currentColor"
                ></circle>
                <path
                    d="M32.42 9a1 1 0 0 0-1-1H10v2h21.42a1 1 0 0 0 1-1z"
                    class="clr-i-outline clr-i-outline-path-4"
                    fill="currentColor"
                ></path>
                <path
                    d="M31.42 16H10v2h21.42a1 1 0 0 0 0-2z"
                    class="clr-i-outline clr-i-outline-path-5"
                    fill="currentColor"
                ></path>
                <path
                    d="M31.42 24H10v2h21.42a1 1 0 0 0 0-2z"
                    class="clr-i-outline clr-i-outline-path-6"
                    fill="currentColor"
                ></path>
            </svg>
        </button>

        <button
            class="icon"
            role="button"
            tab-index="2"
            @click="setContainersView"
        >
            <svg
                id="footer-sample-full"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 36 36"
                class="iconify iconify--clarity"
            >
                <path
                    d="M8 17.58a32.35 32.35 0 0 0 6.3.92a4.13 4.13 0 0 1 .92-1.37a30.94 30.94 0 0 1-7.22-1z"
                    class="clr-i-outline clr-i-outline-path-1"
                    fill="currentColor"
                ></path>
                <path
                    d="M6 28V8.19c.34-.76 4.31-2.11 11-2.11s10.67 1.35 11 2v.3c-.82.79-4.58 2.05-11.11 2.05A33.48 33.48 0 0 1 8 9.44v1.44a35.6 35.6 0 0 0 8.89 1c4.29 0 8.8-.58 11.11-1.82v5.07a5.3 5.3 0 0 1-1.81.88H30V8.12c0-3.19-8.17-4-13-4s-13 .85-13 4V28c0 2.63 5.39 3.68 10 4v-2c-4.87-.34-7.72-1.38-8-2z"
                    class="clr-i-outline clr-i-outline-path-2"
                    fill="currentColor"
                ></path>
                <path
                    d="M8 24.28a31.3 31.3 0 0 0 6 .89v-1.4a28.93 28.93 0 0 1-6-.93z"
                    class="clr-i-outline clr-i-outline-path-3"
                    fill="currentColor"
                ></path>
                <path
                    d="M32 18H18a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V20a2 2 0 0 0-2-2zM18 32V20h14v12z"
                    class="clr-i-outline clr-i-outline-path-4"
                    fill="currentColor"
                ></path>
                <path
                    d="M21 21.7a.7.7 0 0 0-.7.7v7.49a.7.7 0 0 0 1.4 0V22.4a.7.7 0 0 0-.7-.7z"
                    class="clr-i-outline clr-i-outline-path-5"
                    fill="currentColor"
                ></path>
                <path
                    d="M25 21.82a.7.7 0 0 0-.7.7V30a.7.7 0 1 0 1.4 0v-7.48a.7.7 0 0 0-.7-.7z"
                    class="clr-i-outline clr-i-outline-path-6"
                    fill="currentColor"
                ></path>
                <path
                    d="M29 21.7a.7.7 0 0 0-.7.7v7.49a.7.7 0 1 0 1.4 0V22.4a.7.7 0 0 0-.7-.7z"
                    class="clr-i-outline clr-i-outline-path-7"
                    fill="currentColor"
                ></path>
            </svg>
        </button>
    </aside>
</template>

<script>
import { onMounted } from 'vue';
export default {
    props: {
        data: {
            type: Object,
            default: () => ({
                state: { view: 'search', dockerVersion: { name: 'Jeff' } },
            }),
            required: false,
        },
    },
    setup(props) {
        function setSearchView() {
            props.data.setView('search');
        }
        function setImagesView() {
            props.data.setView('images');
        }
        function setContainersView() {
            props.data.setView('containers');
        }

        onMounted(() => {
            console.log(props.data.state);
            console.log('sidebar mounted!');
        });
        return {
            setSearchView,
            setImagesView,
            setContainersView,
        };
    },
    mounted() {
        console.log('sidebar mounted!!!');
        console.log(this);
        console.log(this.$refs);
        console.log(this.$refs.searchBox.focus());
    },
};
</script>

<style scoped>
button.icon {
    @apply p-2 my-1 text-2xl font-extrabold;
}
button:focus {
    background-color: #132c33;
    outline: none;
    @apply ring-2 shadow-xl shadow-gray-900 ring-offset-1 ring-opacity-80 ring-cyan-900;
}
</style>
