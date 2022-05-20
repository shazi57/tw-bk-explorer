import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index';
import App from './App.vue';

const pinia = createPinia();

pinia.use(({ store }) => {
  store.$router = markRaw(router);
});

const app = createApp(App);

app.use(pinia)
  .use(router)
  .mount('#app');
// app.use(pinia);
// app.use(router);
