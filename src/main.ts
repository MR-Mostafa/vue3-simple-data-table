import '~src/assets/styles/index.scss';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from '~src/App.vue';

import { router } from './routes';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
