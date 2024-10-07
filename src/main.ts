import { createApp } from 'vue'
import { createPinia } from "pinia";
import '@/assets/style.css'
import App from './App.vue'

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as vuetifyDirectives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";


const vuetify = createVuetify({
    components,
    directives: vuetifyDirectives,
  });
  const pinia = createPinia();
  const app = createApp(App);

  app.use(pinia);
  app.use(vuetify);
  app.mount("#app");
