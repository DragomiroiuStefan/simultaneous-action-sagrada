import './assets/main.css'
import 'primevue/resources/themes/lara-light-blue/theme.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'


import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Button from "primevue/button"
import Dropdown from "primevue/dropdown"

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.component('Button', Button);
app.component('Dropdown', Dropdown);

app.mount('#app')
