import { createApp } from 'vue';
import App from './App.vue';
import 'virtual:windi.css';

const app = createApp(App).mount('#app');

// TODO: app.config should be defined here. We should be able to
// write error and warn handlers on app.config
// https://v3.vuejs.org/api/application-config.html#errorhandler
console.log(app.config);
// app.config.errorHandler = (err, vm, info) => {
//     // handle error
//     // `info` is a Vue-specific error info, e.g. which lifecycle hook
//     // the error was found in
// };
