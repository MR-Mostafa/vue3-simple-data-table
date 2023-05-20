<script setup lang="ts">
import { useRouter } from 'vue-router';

import { RouteNames } from '~src/types';

const router = useRouter();

const handleRedirectPage = () => {
	router.push({ name: RouteNames.HomePage });
};
</script>

<template>
	<div class="col-12 text-center">
		<p className="fs-1 fw-medium py-3">404 - Page Not Found</p>

		<p class="pb-5">This page no longer exists or was moved to another location.</p>

		<button class="btn btn-outline-secondary" type="button" @click="handleRedirectPage">Go Back To Home Page</button>
	</div>
</template>
