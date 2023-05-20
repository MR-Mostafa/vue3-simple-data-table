<script setup lang="ts">
import Spinner from '~src/components/Spinner/Spinner.vue';

import { type TableBodyProps } from './DataTable.type';

const props = withDefaults(defineProps<TableBodyProps>(), {
	isLoading: false,
	hasError: false,
});
</script>

<template>
	<tbody>
		<tr v-if="props.isLoading" className="pe-none">
			<td colspan="6">
				<div className="text-center pt-4 pb-3">
					<Spinner />
				</div>
			</td>
		</tr>

		<tr v-else-if="props.hasError" className="pe-none">
			<td colspan="6">
				<p className="fw-bold w-100 text-center text-danger py-4">Unfortunately, there was an error.</p>
			</td>
		</tr>

		<template v-else>
			<slot name="data">
				<!--
					- This element is displayed if there is no data or it is not passed
				-->
				<tr className="pe-none">
					<td colspan="6">
						<p className="fw-bold w-100 text-center py-4">Currently, there is no information available.</p>
					</td>
				</tr>
			</slot>
		</template>
	</tbody>
</template>
