import { defineStore } from 'pinia';

import { ProductItem } from '~src/types';

export const useAllProductsStore = defineStore('allProducts', {
	state: () => {
		return {
			data: [] as ProductItem[],
		};
	},
	getters: {
		products: (state) => state.data,
		totalPrice: (state) => {
			const products = state.data;

			return products.reduce((acc: number, current) => {
				return acc + (current.price || 0);
			}, 0);
		},
		totalCount: (state) => state.data.length,
	},
});
