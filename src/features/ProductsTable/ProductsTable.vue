<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { Ref, computed, inject, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { type Limit, type Search } from '~src/App.vue';
import { type TableHeaderList } from '~src/components/DataTable/DataTable.type';
import DataTable from '~src/components/DataTable/DataTable.vue';
import ConfirmDeleteProduct from '~src/features/ProductsTable/ConfirmDeleteProduct.vue';
import IoIosRemoveCircle from '~src/icons/IoIosRemoveCircle.vue';
import IoMdSettings from '~src/icons/IoMdSettings.vue';
import { type Page, type Sort } from '~src/pages/products/index.vue';
import { API } from '~src/services/api';
import { useAllProductsStore } from '~src/stores';
import { ProductItem, type ProductList } from '~src/types';

import InsertNewProducts from './InsertNewProducts.vue';

const router = useRouter();

const allProductsStore = useAllProductsStore();

const { data, isLoading, error } = useAxios<ProductList>(allProductsStore.products.length === 0 ? '/products?limit=100' : '', API);

const deletedProductItem = ref(null) as Ref<ProductItem | null>;
const sort = inject('sort') as Ref<Sort>;
const page = inject('page') as Ref<Page>;
const limit = inject('limitNumber') as Ref<Limit>;
const search = inject('search') as Ref<Search>;

const productsFilter = computed(() => {
	if (!allProductsStore.products || allProductsStore.products.length === 0) return [];
	let productsList = allProductsStore.products;

	/**
	 * 1. Sorts an array of products based on a specified sort key and sort type.
	 **/
	productsList = (() => {
		return productsList.sort((a, b) => {
			const valA = a[sort.value.by];
			const valB = b[sort.value.by];

			if (typeof valA === 'number' && typeof valB === 'number') {
				return sort.value.type === 'asc' ? valA - valB : valB - valA;
			}

			const options = { sensitivity: 'base', usage: 'sort', ignorePunctuation: true };

			return sort.value.type === 'asc'
				? valA.toString().localeCompare(valB.toString(), undefined, options)
				: valB.toString().localeCompare(valA.toString(), undefined, options);
		});
	})();

	/**
	 * 2. Filters products based on a search query.
	 */
	productsList = (() => {
		if (!search.value.by || !search.value.text) return productsList;

		return productsList.filter((item) => {
			const columnItem = item[search.value.by].toString().trim().toLowerCase();

			return columnItem.includes(search.value.text);
		});
	})();

	return productsList;
});

const productsSlice = computed(() => {
	/**
	 * 3. Calculates the portion of the filtered and sorted products array to be displayed based on the current page and limit.
	 **/
	const start = (page.value.current - 1) * limit.value;
	const end = limit.value * page.value.current;

	return productsFilter.value.slice(start, end);
});

const handleShowHideModal = computed(() => {
	return (product?: ProductItem) => {
		deletedProductItem.value = product && product.id ? product : null;
	};
});

watch(data, () => {
	allProductsStore.$patch({ data: data.value?.products || [] });
});

watch(
	[productsFilter, limit, page],
	() => {
		const total = Math.ceil(productsFilter.value.length / limit.value);

		if (page.value.total === total) return;

		page.value.total = total;

		if (page.value.current > total && page.value.total !== 0) {
			page.value.current = total;
		}
	},
	{ immediate: true }
);

const headerItem = computed<TableHeaderList[]>(() => {
	return [
		{
			text: 'id',
			width: '7%',
			isSortable: true,
		},
		{
			text: 'category',
			width: '16%',
			isSortable: true,
		},
		{
			text: 'title',
			width: '23%',
			isSortable: true,
		},
		{
			text: 'price',
			width: '12%',
			isSortable: true,
		},
		{ text: 'description', width: '30%', isSortable: false },
		{ text: 'action', width: '12%', isSortable: false },
	];
});
</script>

<template>
	<DataTable :header-item="headerItem" :is-loading="isLoading" :has-error="!!error">
		<template #data>
			<template v-if="productsSlice.length !== 0">
				<tr v-for="({ id, category, title, price, description }, index) in productsSlice" :key="id">
					<td className="text-center">{{ new Intl.NumberFormat('en-GB', { style: 'decimal' }).format(id) }}</td>
					<td>{{ category }}</td>
					<td>{{ title }}</td>
					<td>
						{{ new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(price) }}
					</td>
					<td>{{ description }}</td>
					<td className="text-center">
						<button class="btn btn-outline-danger border-0 px-3 fs-3 pt-0 pb-1 me-1" @click="handleShowHideModal(productsSlice[index])">
							<IoIosRemoveCircle />
						</button>

						<button class="btn btn-outline-primary border-0 px-3 fs-3 pt-0 pb-1" @click="router.push(`/products/${id}`)">
							<IoMdSettings />
						</button>
					</td>
				</tr>
			</template>
		</template>

		<template #footer>
			<InsertNewProducts />
		</template>
	</DataTable>

	<ConfirmDeleteProduct :product-item="deletedProductItem" :on-close-modal="handleShowHideModal" />
</template>
