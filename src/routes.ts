import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import NotFound from '~src/pages/NotFound.vue';
import Products from '~src/pages/products/index.vue';

import { RouteNames } from './types';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: RouteNames.HomePage, redirect: { name: RouteNames.ProductsPage } },
	{ path: '/products', name: RouteNames.ProductsPage, component: Products },
	{ path: '/:pathMatch(.*)*', name: RouteNames.NotFoundPage, component: NotFound },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
