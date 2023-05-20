import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import Products from '~src/pages/products/index.vue';

import { RouteNames } from './types';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: 'home', redirect: { name: RouteNames.Products } },
	{ path: '/products', name: RouteNames.Products, component: Products },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
