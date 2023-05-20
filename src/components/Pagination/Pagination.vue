<script setup lang="ts">
import { computed } from 'vue';

import ArrowBigLeftFilled from '~src/icons/ArrowBigLeftFilled.vue';
import ArrowBigRightFilled from '~src/icons/ArrowBigRightFilled.vue';

interface PageProps {
	startPage: number;
	currentPage: number;
	totalPage: number;
	onChangePage: (value: number) => void;
}
const DEFAULT_CLASS = 'btn btn-primary p-2 d-flex align-items-center justify-content-center';
const props = defineProps<PageProps>();

const page = computed(() => {
	const total = Math.ceil(props.totalPage);
	const current = Math.ceil(props.currentPage) > total ? total : Math.ceil(props.currentPage);

	return {
		currentPage: current,
		totalPage: total,
		isDisabledPrevPage: props.startPage >= current,
		isDisabledNextPage: current >= total,
	};
});
</script>

<template>
	<div v-if="page.totalPage >= 1" class="d-inline-flex flex-row align-items-center justify-content-center gap-2" :class="$style.pagination">
		<button type="button" :class="DEFAULT_CLASS" :disabled="page.isDisabledPrevPage" @click="() => onChangePage(props.startPage)">
			{{ props.startPage }}
		</button>

		<button type="button" :class="DEFAULT_CLASS" :disabled="page.isDisabledPrevPage" @click="() => onChangePage(page.currentPage - 1)">
			<ArrowBigLeftFilled />
		</button>

		<button type="button" :class="DEFAULT_CLASS" class="btn-current" disabled>{{ page.currentPage }}</button>

		<button type="button" :class="DEFAULT_CLASS" :disabled="page.isDisabledNextPage" @click="() => onChangePage(page.currentPage + 1)">
			<ArrowBigRightFilled />
		</button>

		<button type="button" :class="DEFAULT_CLASS" :disabled="page.isDisabledNextPage" @click="() => onChangePage(page.totalPage)">
			{{ page.totalPage }}
		</button>
	</div>
</template>

<style lang="scss" module>
.pagination {
	:global {
		button {
			width: 45px;
			height: 40px;
		}

		.btn-current {
			width: 60px;
		}

		svg {
			font-size: 2.2rem;
		}
	} // :global
} // .pagination
</style>
