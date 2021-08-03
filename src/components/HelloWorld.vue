<template>
  <h1>{{ msg }}</h1>
  <h2>{{ data.state.dockerVersion.name }}</h2>
  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="handleClick">
    change docker version {{numOfClicks}}
  </button>

  <button type="button" @click="getDocker">
    get docker
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script>
import { ref } from "vue";

export default {
  props: {
    msg: String,
    data: Object
  },
  setup(props) {
    console.log(typeof(props))
    console.log(Object.keys(props))
    console.log(props.data)
    let numOfClicks = ref(0);
    function handleClick() {
      numOfClicks.value++;
    }
    function getDocker() {
      props.data.setDockerVersion({ name: 'Jeff' })
    }
    return {
      handleClick,
      numOfClicks,
      getDocker
    };
  }
};

</script>

<style scoped>
a {
  color: #42b983;
}
</style>
