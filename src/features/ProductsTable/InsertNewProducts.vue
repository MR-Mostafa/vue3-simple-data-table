<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, reactive } from 'vue';

import IosAddCircle from '~src/icons/IosAddCircle.vue';
import { API } from '~src/services/api';
import { useAllProductsStore } from '~src/stores';
import { ProductItem } from '~src/types';

interface NewProduct {
	category: {
		value?: string;
		hasError?: boolean;
	};
	title: {
		value?: string;
		hasError?: boolean;
	};
	price: {
		value?: string;
		hasError?: boolean;
	};
	description: {
		value?: string;
		hasError?: boolean;
	};
}
const allProductsStore = useAllProductsStore();

const { isLoading: isSendingNewProduct, execute } = useAxios<ProductItem>({ method: 'post' }, API);
const { isLoading: isLoadingCategories, data: categories } = useAxios<ProductItem>('/products/categories', API);

const newProduct = reactive<NewProduct>({
	category: {},
	title: {},
	price: {},
	description: {},
});

const hasErrorForm = computed(() => {
	const keys = Object.keys(newProduct) as [keyof NewProduct];

	return keys.some((item) => newProduct[item].hasError || !newProduct[item].value);
});

const handleUpdateInput = computed(() => {
	return (e: Event) => {
		const target = e.target as HTMLInputElement;
		const { name, value, pattern } = target as { name: keyof NewProduct; value: string; pattern?: string };

		if (!name) {
			throw new Error('The name attribute is required.');
		}

		newProduct[name] = { value, hasError: pattern ? !new RegExp(pattern).test(value) : false };
	};
});

const handleAddNewProduct = computed(() => {
	return () => {
		const keys = Object.keys(newProduct) as [keyof NewProduct];
		const lastId = allProductsStore.products[allProductsStore.products.length - 1].id;

		const values = keys.reduce((acc: Record<string, unknown>, item) => {
			return { ...acc, [item]: item === 'price' ? parseFloat(newProduct[item].value || '0') : newProduct[item].value };
		}, {});

		execute('/products/add', { data: values }).then(() => {
			allProductsStore.$patch({ data: [...allProductsStore.products, { id: lastId + 1, ...values }] });

			// reset form
			keys.forEach((item) => (newProduct[item] = { value: '', hasError: false }));
		});
	};
});
</script>

<template>
	<tr>
		<td class="text-center">#</td>

		<td>
			<select
				:value="newProduct.category.value"
				aria-label="Select a category"
				name="category"
				required
				class="form-select"
				:class="{ 'is-invalid': newProduct.category.hasError }"
				@input="handleUpdateInput"
			>
				<option disabled value="">Select a category</option>
				<option v-for="(category, index) in categories" :key="index" :value="category">{{ category }}</option>
			</select>
		</td>

		<td>
			<input
				v-model="newProduct.title.value"
				inputmode="text"
				placeholder="Product Name"
				name="title"
				pattern="^[\w\s.]+$"
				required
				type="text"
				class="form-control"
				:class="{ 'is-invalid': newProduct.title.hasError }"
				@input="handleUpdateInput"
			/>
		</td>

		<td>
			<input
				v-model="newProduct.price.value"
				inputmode="decimal"
				placeholder="Product Price"
				name="price"
				pattern="^\d+(\.\d+)?$"
				required
				type="text"
				class="form-control"
				:class="{ 'is-invalid': newProduct.price.hasError }"
				@input="handleUpdateInput"
			/>
		</td>

		<td>
			<input
				v-model="newProduct.description.value"
				inputmode="text"
				placeholder="Product Description"
				name="description"
				pattern="^[\w\s.]+$"
				required
				type="text"
				class="form-control"
				:class="{ 'is-invalid': newProduct.description.hasError }"
				@input="handleUpdateInput"
			/>
		</td>

		<td class="text-center">
			<button
				type="button"
				class="position-relative border-0 px-3 pt-0 pb-1 fs-3 btn btn-outline-success"
				:disabled="hasErrorForm || isSendingNewProduct || isLoadingCategories"
				@click="handleAddNewProduct"
			>
				<span
					v-if="isSendingNewProduct"
					class="spinner-border spinner-border-sm fs-6 position-absolute top-0 start-0 end-0 bottom-0 m-auto"
					role="status"
					aria-hidden="true"
				></span>

				<IosAddCircle :class="{ 'opacity-0': isSendingNewProduct }" />
			</button>
		</td>
	</tr>
</template>
