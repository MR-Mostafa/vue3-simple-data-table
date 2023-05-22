<script setup lang="ts">
import { useAxios } from '@vueuse/integrations/useAxios';
import { computed } from 'vue';

import Modal from '~src/components/Modal/Modal.vue';
import { API } from '~src/services/api';
import { useAllProductsStore } from '~src/stores';
import { ProductItem } from '~src/types';

interface IProps {
	productItem: ProductItem | null;
	onCloseModal: () => void;
}

const allProductsStore = useAllProductsStore();

const props = defineProps<IProps>();

const { isLoading, execute } = useAxios<ProductItem>({ method: 'delete' }, API);

const handleDeleteProduct = computed(() => {
	return (id: number) => {
		execute(`/products/${id}`).then(() => {
			const newProducts = allProductsStore.products.filter((item) => item.id !== id);
			allProductsStore.$patch({ data: newProducts });
			props.onCloseModal();
		});
	};
});
</script>

<template>
	<Modal v-if="props.productItem && props.productItem.id" :on-back-drop="() => (isLoading ? false : props.onCloseModal())">
		<template #header>
			<div class="modal-title h4">Are you sure</div>
			<button
				type="button"
				class="btn-close"
				aria-label="Close"
				:disabled="isLoading"
				@click="() => (isLoading ? false : props.onCloseModal())"
			></button>
		</template>

		<template #body>
			<p className="pb-1">Do you really want to delete this item?</p>
			<p className="py-2 fw-bold">Product Item:</p>
			<ul className="ms-3 list-unstyled">
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- ID:</span>
					<span className="flex-fill text-truncate">{{ props.productItem.id }}</span>
				</li>
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- Title:</span>
					<span className="flex-fill text-truncate">{{ props.productItem.title }}</span>
				</li>
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- Category:</span>
					<span className="flex-fill text-truncate">{{ props.productItem.category }}</span>
				</li>
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- Price:</span>
					<span className="flex-fill text-truncate">
						{{
							new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol' }).format(
								props.productItem.price
							)
						}}
					</span>
				</li>
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- Description:</span>
					<span className="flex-fill text-truncate">{{ props.productItem.description }}</span>
				</li>
				<li className="d-flex align-items-center justify-content-start flex-nowrap">
					<span className="pe-2 fw-bold flex-shrink-0">- Title:</span>
					<span className="flex-fill text-truncate">{{ props.productItem.title }}</span>
				</li>
			</ul>
		</template>

		<template #footer>
			<button type="button" class="btn btn-secondary" :disabled="isLoading" @click="props.onCloseModal">Cancel</button>

			<button
				type="button"
				class="position-relative btn btn-danger"
				:disabled="isLoading"
				@click="handleDeleteProduct(props.productItem!.id)"
			>
				<span
					v-if="isLoading"
					class="spinner-border spinner-border-sm fs-6 position-absolute top-0 start-0 end-0 bottom-0 m-auto"
					role="status"
					aria-hidden="true"
				></span>

				<span :class="{ 'opacity-0': isLoading }">Delete Item</span>
			</button>
		</template>
	</Modal>
</template>
