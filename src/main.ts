import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import axios from "axios";
import router from "./router";

axios.defaults.baseURL = "http://localhost:3001";

createApp(App).use(router).mount("#app");
