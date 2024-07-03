import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import authRoutes from './auth';

import Appointments from '@/views/frontend/pages/appointments.vue';

const routes = [
  {
	path: "/",
	name: "Home",
	component: Home,
  },
  {
    path: '/appointments',
    name: 'appointments',
    component: Appointments 
  },
  ...authRoutes,
];

const router = createRouter({
  base: "/alqallaf/",
  history: createWebHistory('/alqallaf/'),
  routes,
});

router.beforeEach((to, from, next) => {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Continue with the navigation
  next();
});

export default router;
