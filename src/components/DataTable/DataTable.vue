<script setup lang="ts">
import { useSlots } from 'vue';

import { type TableBodyProps, type TableHeaderList } from './DataTable.type';
import TableBody from './TableBody.vue';
import TableFooter from './TableFooter.vue';
import TableHeader from './TableHeader.vue';

interface IProps extends TableBodyProps {
	headerItem: TableHeaderList[];
}

const slots = useSlots();
const props = defineProps<IProps>();
</script>

<template>
	<div class="table-responsive">
		<table :class="[$style.table, $style.tableTruncate]" class="table table-striped table-hover table-bordered">
			<TableHeader :list="props.headerItem" />

			<TableBody :is-loading="props.isLoading" :has-error="props.hasError">
				<template #data>
					<slot name="data"></slot>
				</template>
			</TableBody>

			<TableFooter v-if="slots.footer">
				<template #footer>
					<slot name="footer"></slot>
				</template>
			</TableFooter>
		</table>
	</div>
</template>

<style lang="scss" module>
@import '~src/assets/styles/responsive';

.table {
	margin: 2.5rem 0;
	table-layout: fixed;

	:global {
		tr {
			border-width: 3px;
		}

		td {
			transition: all 0.2s ease-in-out;
		}

		th,
		td {
			vertical-align: middle;
			line-height: 1.7;
		}
	}

	@include media-breakpoint-up(lg) {
		width: 100%;
	}

	@include media-breakpoint-down(lg) {
		width: auto;
	}
} // .table

.tableTruncate {
	:global {
		th,
		td {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
