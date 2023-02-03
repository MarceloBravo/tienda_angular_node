import { createRouter, createWebHashHistory } from 'vue-router';
import login from '../views/backoffice/login/login.vue';
import home from '../views/backoffice/home/home.vue';

const routes = [
    {path: '/login', name: 'login', component: login },
    {path: '/home', name: 'home', component: home }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: routes
});

export default router;