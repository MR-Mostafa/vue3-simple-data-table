<script setup lang="ts">
import { onMounted, onUnmounted, useSlots } from 'vue';

const slots = useSlots();

const props = defineProps<{ onBackDrop?: () => void }>();

onMounted(() => {
	document.body.classList.add('overflow-hidden');
});

onUnmounted(() => {
	document.body.classList.remove('overflow-hidden');
});

const handleCloseModal = () => {
	if (!props.onBackDrop) return;

	props.onBackDrop();
};
</script>

<template>
	<Teleport to="#teleport-container">
		<div class="modal fade show d-block" tabindex="-1" aria-modal="true" role="dialog" @click.self="handleCloseModal">
			<div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
				<div class="modal-content">
					<div v-if="slots.header" class="modal-header">
						<slot name="header"></slot>
					</div>

					<div v-if="slots.body" class="modal-body">
						<slot name="body"></slot>
					</div>

					<div v-if="slots.footer" class="modal-footer">
						<slot name="footer"></slot>
					</div>
				</div>
			</div>
		</div>

		<div class="modal-backdrop fade show" @click.self="handleCloseModal"></div>
	</Teleport>
</template>
