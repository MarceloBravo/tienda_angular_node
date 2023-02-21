import { createRouter, createWebHashHistory } from 'vue-router';
import Login from '../views/backoffice/login/login.vue';
import home from '../views/backoffice/home/home.vue';

const routes = [
    {path: '/', name: 'login', component: Login },
    {path: '/login', name: 'login', component: Login },
    {path: '/home', name: 'home', component: home }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes: routes,
    mode: 'hash'
});

export default router;