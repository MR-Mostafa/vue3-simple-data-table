<script setup lang="ts">
import { Ref, computed, inject } from 'vue';

import debounce from 'lodash/debounce';

import { type Limit, type Search } from '~src/App.vue';

const limit = inject<Ref<Limit>>('limitNumber');
const search = inject('search') as Ref<Search>;

const onChangeSearchText = computed(() => {
	return debounce((e: Event) => {
		const target = e.target as HTMLInputElement;
		search.value.text = target.value;
	}, 300);
});
</script>

<template>
	<form>
		<div class="row">
			<div class="col-md-5 col-12">
				<div class="row">
					<div class="col-md-5 col-12">
						<select v-model="search.by" class="form-select" aria-label="Search in column" name="searchBy">
							<option disabled>Search in column</option>
							<option value="id">ID</option>
							<option value="category">Category</option>
							<option value="title">Title</option>
							<option value="price">Price</option>
						</select>
					</div>

					<div class="col-md-7 col-12">
						<input
							:value="search.text"
							type="text"
							inputMode="text"
							placeholder="Enter the text"
							name="searchText"
							class="form-control"
							@input="onChangeSearchText"
						/>
					</div>
				</div>
			</div>

			<div class="col offset-md-5">
				<select v-model="limit" class="form-select" aria-label="Number of rows" name="limit">
					<option disabled>Number of rows</option>
					<option value="5">5</option>
					<option value="12">12</option>
					<option value="30">30</option>
				</select>
			</div>
		</div>
		<!--///// row /////-->
	</form>
</template>
