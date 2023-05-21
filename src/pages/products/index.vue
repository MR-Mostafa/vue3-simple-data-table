<script setup lang="ts">
import { Ref, computed, provide, ref, watch } from 'vue';

import Pagination from '~src/components/Pagination/Pagination.vue';
import { useRouteQuery } from '~src/compositions';
import ProductsTable from '~src/features/ProductsTable/ProductsTable.vue';
import productsHeader from '~src/features/ProductsTable/productsHeader.vue';
import { ProductsKeys } from '~src/types/products.type';

export type Limit = 5 | 12 | 30;
export interface Search {
	by: ProductsKeys;
	text: string;
}

export interface Sort {
	by: ProductsKeys;
	type: 'asc' | 'des';
}

export interface Page {
	current: number;
	start: number;
	total: number;
}

const { queries, setQueries } = useRouteQuery<{
	sortBy: ProductsKeys;
	sortType: 'asc' | 'des';
	limit: Limit;
	page: string;
	searchText: string;
	searchBy: ProductsKeys;
}>();

const sortByQuery = queries.sortBy || (import.meta.env.GB_Products_sortBy as ProductsKeys);
const sortTypeQuery = queries.sortType || (import.meta.env.GB_Products_sortType as 'asc' | 'des');
const currentPageQuery = queries.page && +queries.page >= 1 ? +queries.page : 1;
const limitQuery = queries.limit || (+import.meta.env.GB_Products_limit as Limit);
const searchTextQuery = queries.searchText || '';
const searchByQuery = queries.searchBy || 'id';

const sort = ref<Sort>({ by: sortByQuery, type: sortTypeQuery });
const page = ref<Page>({ current: currentPageQuery, start: 1, total: 0 });
const limit = ref<Limit>(limitQuery);
const search = ref<Search>({ by: searchByQuery, text: searchTextQuery });

provide<Ref<Sort>>('sort', sort);
provide<Ref<Page>>('page', page);
provide<Ref<number>>('limitNumber', limit);
provide<Ref<Search>>('search', search);

watch([sort.value], () => {
	setQueries({
		sortBy: sort.value.by,
		sortType: sort.value.type,
	});
});

watch([page.value], () => {
	setQueries({
		page: page.value.current,
	});
});

watch([limit], () => {
	setQueries({
		limit: limit.value,
	});
});

watch([search.value], () => {
	setQueries({
		searchText: search.value.text,
		searchBy: search.value.text ? search.value.by : '',
	});
});

const onChangePage = computed(() => {
	return (value: number) => {
		document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		page.value.current = value;
	};
});
</script>

<template>
	<div class="col-12">
		<productsHeader />
	</div>

	<div class="col-12">
		<ProductsTable />
	</div>

	<div class="col-12">
		<Pagination :current-page="page.current" :start-page="page.start" :total-page="page.total" :on-change-page="onChangePage" />
	</div>
</template>
