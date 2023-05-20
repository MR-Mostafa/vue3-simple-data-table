<script setup lang="ts">
import { Ref, computed, inject, onMounted, provide, reactive, ref } from 'vue';

import { type Limit, type Search } from '~src/App.vue';
import { type TableBodyProps, type TableHeaderList } from '~src/components/DataTable/DataTable.type';
import DataTable from '~src/components/DataTable/DataTable.vue';
import IoIosRemoveCircle from '~src/icons/IoIosRemoveCircle.vue';
import IoMdSettings from '~src/icons/IoMdSettings.vue';
import { getAllProducts } from '~src/services/products';
import { type ProductList, type ProductsKeys } from '~src/types';

export interface Sort {
	by: ProductsKeys;
	type: 'asc' | 'des';
}

interface RefDate extends TableBodyProps {
	data: ProductList | null;
}

const refData = reactive<RefDate>({ hasError: false, isLoading: false, data: null });
const sort = ref<Sort>({ by: 'id', type: 'asc' });
const limit = inject('limitNumber') as Ref<Limit>;
const search = inject<Ref<Search>>('search');
const page = 1;
provide<Ref<Sort>>('sort', sort);

const products = computed(() => {
	if (!refData.data || !refData.data.products || refData.data.products.length === 0) return [];

	let productsList = refData.data.products;

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
		if (!search?.value.by || !search.value.text) return productsList;

		return productsList.filter((item) => {
			const columnItem = item[search.value.by].toString().trim().toLowerCase();

			return columnItem.includes(search.value.text);
		});
	})();

	/**
	 * 3. Calculates the portion of the filtered and sorted products array to be displayed based on the current page and limit.
	 **/
	const start = (page - 1) * limit.value;
	const end = limit.value * page;

	return productsList.slice(start, end);
});

onMounted(() => {
	refData.isLoading = true;

	getAllProducts<ProductList>()
		.then((res) => {
			refData.data = res.data;
		})
		.catch((err) => {
			refData.hasError = true;
			console.error(err);
		})
		.finally(() => {
			refData.isLoading = false;
		});
});

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
	<DataTable :header-item="headerItem" :is-loading="refData.isLoading" :has-error="refData.hasError">
		<template #data>
			<template v-if="products.length !== 0">
				<tr v-for="{ id, category, title, price, description } in products" :key="id">
					<td className="text-center">{{ new Intl.NumberFormat('en-GB', { style: 'decimal' }).format(id) }}</td>
					<td>{{ category }}</td>
					<td>{{ title }}</td>
					<td>
						{{ new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(price) }}
					</td>
					<td>{{ description }}</td>
					<td className="text-center">
						<button class="btn btn-outline-danger border-0 px-3 fs-3 pt-0 pb-1 me-1">
							<IoIosRemoveCircle />
						</button>

						<button class="btn btn-outline-primary border-0 px-3 fs-3 pt-0 pb-1">
							<IoMdSettings />
						</button>
					</td>
				</tr>
			</template>
		</template>
	</DataTable>
</template>