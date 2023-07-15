import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config';
//theme
import "primevue/resources/themes/lara-light-indigo/theme.css";      
//core
import "primevue/resources/primevue.min.css";

import  'primeicons/primeicons.css';

import Dropdown from 'primevue/dropdown';

import Calendar from 'primevue/calendar';

import InlineMessage from 'primevue/inlinemessage';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';

import Button from 'primevue/button';

import "/node_modules/primeflex/primeflex.css";

const app = createApp(App);
app.component('Dropdown', Dropdown);
app.component('Dialog', Dialog);
app.component('Calendar', Calendar);
app.component('InputText', InputText);
app.component('InlineMessage', InlineMessage);
app.component('Button', Button);



app.use(PrimeVue);
app.mount('#app')
