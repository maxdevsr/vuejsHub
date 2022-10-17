import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { MotionPlugin } from "@vueuse/motion";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";


const app = createApp(App)

app.use(router)
app.use(MotionPlugin);
app.mount('#app')
