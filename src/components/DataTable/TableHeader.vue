<script setup lang="ts">
import FaSortDown from '~src/icons/FaSortDown.vue';
import FaSortUp from '~src/icons/FaSortUp.vue';

import { type TableHeaderList } from './DataTable.type';

const DEFAULT_CLASS =
	'px-3 py-4 d-flex align-items-center justify-content-center gap-4 w-100 fs-6 fw-bold border-0 bg-transparent text-black rounded-0';

defineProps<{ list: TableHeaderList[] }>();
</script>

<template>
	<thead>
		<tr class="user-select-none">
			<th v-for="({ text, onSort, width }, index) in list" :key="index" :style="{ width }">
				<button v-if="onSort" type="button" :class="DEFAULT_CLASS" class="btn btn-light btn-sort">
					{{ text }}
					<span className="d-flex flex-column justify-content-center align-items-center sort-icons">
						<FaSortUp />
						<FaSortDown />
					</span>
				</button>

				<span v-else :class="DEFAULT_CLASS">{{ text }}</span>
			</th>
		</tr>
	</thead>
</template>

<style lang="scss" scoped>
.thead {
	th {
		padding: 0;
	}
}

.btn-sort {
	&:hover {
		--bs-text-opacity: 0.7;
	}

	&:active {
		--bs-text-opacity: 1;
	}

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
} // .btnSort

.activeSort {
	background-color: var(--bs-table-hover-bg) !important;
}
</style>
