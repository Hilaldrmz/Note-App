// DEFINE OUR ROUTER RULES

import {createRouter, createWebHistory} from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import LoginView from "../views/LoginView.vue";
import NotFoundView from "../views/404View.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path:"/home",
            name: 'home',
            component: HomeView
        },
        {
            path:"/home",
            redirect: "/"
        },
        {
            path:"/",
            name: 'dashboard',
            component: DashboardView
        },
        {
            path:"/",
            name: 'login',
            component: LoginView
        },
        {
            path:"/:catchall(.*)*",
            name: 'Not Found',
            component: NotFoundView
        },
    ]
});

export default router;