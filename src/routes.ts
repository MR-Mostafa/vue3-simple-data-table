import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import NotFound from '~src/pages/NotFound.vue';
import Products from '~src/pages/products/index.vue';

import { RouteNames } from './types';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: RouteNames.Home, redirect: { name: RouteNames.Products } },
	{ path: '/products', name: RouteNames.Products, component: Products },
	{ path: '/:pathMatch(.*)*', name: RouteNames.NotFound, component: NotFound },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
