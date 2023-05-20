<script setup lang="ts">
import { Ref, computed, inject } from 'vue';

import { type Sort } from '~src/features/ProductsTable/ProductsTable.vue';
import FaSortDown from '~src/icons/FaSortDown.vue';
import FaSortUp from '~src/icons/FaSortUp.vue';
import { type ProductsKeys } from '~src/types';

import { type TableHeaderList } from './DataTable.type';

const DEFAULT_CLASS =
	'px-3 py-4 d-flex align-items-center justify-content-center gap-4 w-100 fs-6 fw-bold border-0 bg-transparent text-black rounded-0';

const sort = inject('sort') as Ref<Sort>;
defineProps<{ list: TableHeaderList[] }>();

const sortHandler = computed(() => {
	return (text: ProductsKeys) => {
		sort.value.type = sort.value.type === 'asc' && sort.value.by === text ? 'des' : 'asc';
		sort.value.by = text;
	};
});
</script>

<template>
	<thead :class="$style.thead">
		<tr class="user-select-none">
			<th v-for="({ text, width, isSortable }, index) in list" :key="index" :style="{ width }">
				<button
					v-if="isSortable"
					type="button"
					:class="[DEFAULT_CLASS, $style.btnSort, { [$style.activeSort]: sort.by === text }]"
					class="btn btn-light"
					@click="() => sortHandler(text as ProductsKeys)"
				>
					{{ text }}
					<span className="d-flex flex-column justify-content-center align-items-center sort-icons">
						<FaSortUp :class="{ active: sort.type === 'asc' && sort.by === text }" />
						<FaSortDown :class="{ active: sort.type === 'des' && sort.by === text }" />
					</span>
				</button>

				<span v-else :class="DEFAULT_CLASS">{{ text }}</span>
			</th>
		</tr>
	</thead>
</template>

<style lang="scss" module>
.thead {
	:global {
		th {
			padding: 0;
		}

		button,
		span {
			text-transform: capitalize;
		}
	}
}

.btnSort {
	&:hover {
		--bs-text-opacity: 0.7;
	}

	&:active {
		--bs-text-opacity: 1;
	}

	:global {
		.sort-icons {
			$dimension: 18px;

			position: relative;
			height: $dimension;
			width: $dimension;
			max-height: 100%;
			transform: translateY(1px);
			color: #b7b7b7;

			svg {
				position: absolute;
				flex: 0 0 $dimension;
				width: $dimension;
				height: $dimension;

				&:first-child {
					top: -1px;
					bottom: auto;
				}

				&:last-child {
					top: auto;
					bottom: 0px;
				}
			} // svg

			.active {
				color: #2e2e2e;
			}
		} // .sort-icons
	} // :global
} // .btnSort

.activeSort {
	background-color: var(--bs-table-hover-bg) !important;
}
</style>
