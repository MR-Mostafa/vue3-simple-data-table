<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed, onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { API } from '~src/services/api';
import { useAllProductsStore } from '~src/stores';
import { ProductItem, RouteNames } from '~src/types';

const { params } = useRoute();
const router = useRouter();

const product = ref<ProductItem>();
const allProductsStore = useAllProductsStore();
const { execute: getProduct } = useAxios<ProductItem>(API);
const { execute: updateProduct } = useAxios<ProductItem>({ method: 'put' }, API);

const handleUpdateInput = computed(() => {
	return (e: Event) => {
		if (!product.value) return;

		const target = e.target as HTMLInputElement;
		const { name, value, pattern, type } = target;

		if (!name || !product.value.hasOwnProperty(name)) return;

		if (pattern && !new RegExp(pattern).test(value)) return;

		product.value = { ...product.value, [name]: type === 'number' ? +value || 0 : value };
	};
});

const redirectToProductsPage = computed(() => {
	return () => {
		router.push({ name: RouteNames.ProductsPage });
	};
});

const handleUpdateProduct = computed(() => {
	const id = params.id;

	return () => {
		if (!product.value) return;

		updateProduct(`/products/${id}`, { data: { price: product.value?.price } }).then(() => {
			const updateAllProducts = allProductsStore.products.map((item) => {
				if (item.id === +id) return product.value!;

				return item;
			});

			allProductsStore.$patch({ data: updateAllProducts });
			redirectToProductsPage.value();
		});
	};
});

onBeforeMount(() => {
	const id = params.id;
	const hasProduct = allProductsStore.products.find((item) => item.id === +id);

	if (hasProduct) {
		product.value = hasProduct;
		return;
	}

	getProduct(`/products/${id}`)
		.then((res) => {
			product.value = res.data.value;

			return res;
		})
		.catch(() => {
			router.push('/404');
		});
});
</script>

<template>
	<template v-if="!!product">
		<div class="pt-5 col-12">
			<div class="mb-3 form-floating">
				<input
					id="productName"
					inputmode="text"
					placeholder="Product Name"
					type="text"
					name="title"
					disabled
					class="form-control"
					:value="product.title"
				/>
				<label for="productName">Product Name</label>
			</div>

			<div class="mb-3 form-floating">
				<input
					id="productPrice"
					inputmode="decimal"
					placeholder="Product Price"
					name="price"
					type="number"
					pattern="^\d+(\.\d+)?$"
					required
					class="form-control"
					:value="product.price"
					@input="handleUpdateInput"
				/>
				<label for="productPrice">Product Price</label>
			</div>

			<div class="mb-3 form-floating">
				<input
					id="productPrice"
					placeholder="Product Price"
					inputmode="text"
					name="category"
					type="string"
					disabled
					class="form-control"
					:value="product.category"
				/>
				<label for="productPrice">Product Category</label>
			</div>
		</div>

		<div class="col">
			<div class="d-flex aligns-items-center justify-content-end gap-3 pt-3">
				<button type="button" class="border-1 border-secondary border-opacity-50 btn btn-light" @click="redirectToProductsPage">
					Skip
				</button>

				<button type="button" class="btn btn-primary" @click="handleUpdateProduct">Save &amp; Continue</button>
			</div>
		</div>
	</template>
</template>
