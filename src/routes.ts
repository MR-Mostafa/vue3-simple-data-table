import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router';

import NotFound from '~src/pages/NotFound.vue';
import ProductId from '~src/pages/products/[productId].vue';
import Products from '~src/pages/products/index.vue';
import { RouteNames } from '~src/types';

const routes: RouteRecordRaw[] = [
	{ path: '/', name: RouteNames.HomePage, redirect: { name: RouteNames.ProductsPage } },
	{
		path: '/products',
		name: RouteNames.ProductsPage,
		component: Products,
	},
	{
		path: '/products/:id(\\d+)',
		name: RouteNames.ProductId,
		component: ProductId,
	},
	{ path: '/:pathMatch(.*)*', name: RouteNames.NotFoundPage, component: NotFound },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
