<script setup lang="ts">
import { Ref, provide, ref } from 'vue';

import ProductsTable from '~src/features/ProductsTable/ProductsTable.vue';
import productsHeader from '~src/features/ProductsTable/productsHeader.vue';
import { ProductsKeys } from '~src/types/products.type';

export type Limit = 5 | 12 | 30;
export interface Search {
	by: ProductsKeys;
	text: string;
}

const limit = ref<Limit>(12);
const search = ref<Search>({ by: 'id', text: '' });
provide<Ref<number>>('limitNumber', limit);
provide<Ref<Search>>('search', search);
</script>

<template>
	<div class="col-12">
		<productsHeader />
		<ProductsTable />
	</div>
</template>
