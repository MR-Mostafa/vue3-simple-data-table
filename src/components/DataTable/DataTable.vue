<script setup lang="ts">
import { type TableBodyProps, type TableHeaderList } from './DataTable.type';
import TableBody from './TableBody.vue';
import TableHeader from './TableHeader.vue';

interface IProps extends TableBodyProps {
	headerItem: TableHeaderList[];
}

const props = withDefaults(defineProps<IProps>(), {
	isLoading: false,
	hasError: false,
});
</script>

<template>
	<div class="table-responsive">
		<table class="table table-striped table-hover table-bordered table-truncate">
			<TableHeader :list="props.headerItem" />

			<TableBody :is-loading="props.isLoading" :has-error="props.hasError">
				<template #data>
					<slot name="data"></slot>
				</template>
			</TableBody>
		</table>
	</div>
</template>

<style lang="scss" scoped>
@import '~src/assets/styles/responsive';

.table {
	margin: 2.5rem 0;
	table-layout: fixed;

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

	@include media-breakpoint-up(lg) {
		width: 100%;
	}

	@include media-breakpoint-down(lg) {
		width: auto;
	}
} // .table

.table-truncate {
	th,
	td {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
