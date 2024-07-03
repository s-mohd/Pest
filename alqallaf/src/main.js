import { createApp, reactive } from "vue";
import App from "./App.vue";

import router from './router';
import resourceManager from "../../../doppio/libs/resourceManager";
import call from "../../../doppio/libs/controllers/call";
import socket from "../../../doppio/libs/controllers/socket";
import Auth from "../../../doppio/libs/controllers/auth";

// import primevue/ vutify
import PrimeVue from 'primevue/config';
import { createVuetify } from 'vuetify'

// Other UI libraries
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import VueFeather from 'vue-feather';

// Import styles
import 'normalize.css';
import 'vuetify/styles'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import 'primevue/resources/themes/aura-light-blue/theme.css'
import 'primeicons/primeicons.css' 

import '@mdi/font/css/materialdesignicons.css'
import { fa } from 'vuetify/iconsets/fa'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import Sidebar from '@/views/frontend/layouts/sidebar.vue'
import AppointmentTab from '@/views/frontend/pages/appointment-tab.vue'

const app = createApp(App);
const auth = reactive(new Auth());

app.component('appointmenttab',AppointmentTab)
app.component('sidebar',Sidebar)
// Use other UI libraries and plugins
app.use(Antd);

app.component(VueFeather.name, VueFeather);
const vuetify = createVuetify({
    icons: {
        defaultSet: 'fa',
        aliases,
        sets: {
          fa,
		  mdi,
        },
    },
	display: {
		mobileBreakpoint: 'sm',
		thresholds: {
			xs: 0,
			sm: 576,
			md: 768,
			lg: 992,
			xl: 1200,
  			xxl: 1400
		},
	},
	$reset: false
})
app.use(PrimeVue).use(vuetify);

// Plugins
app.use(router);
app.use(resourceManager);

// Global Properties,
// components can inject this
app.provide("$auth", auth);
app.provide("$call", call);
app.provide("$socket", socket);


// Configure route gaurds
router.beforeEach(async (to, from, next) => {
	if (to.matched.some((record) => !record.meta.isLoginPage)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (!auth.isLoggedIn) {
			window.location.href = '/login';
		} else {
			next();
		}
	} else {
		if (auth.isLoggedIn) {
			next({ name: 'Home' });
		} else {
			next();
		}
	}
});

// Handle Global Resources
let resources = reactive({
	user: {},
	practitioners: [],
	patients: [],
	appointmentTypes: [],
	departments: [],
	serviceUnits: [],
	complaints: [],
	diagnosis: [],
	medications: [],
	items: [],
	dosageForms: [],
	prescriptionDosages: [],
	prescriptionDurations: [],
	labTestTemplates: [],
});

call('pest.api.methods.fetch_resources').then(response => {
	if(response){
		for (let key in resources) {
			resources[key] = response[key]
		}
	}
}).catch(error => {
	console.error('Error fetching records:', error);
});

app.config.globalProperties.$resources = resources;

app.mount("#app");
