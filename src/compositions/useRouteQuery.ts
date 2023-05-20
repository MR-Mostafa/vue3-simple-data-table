import { LocationQueryRaw, useRoute, useRouter } from 'vue-router';

import cloneDeep from 'lodash/cloneDeep';

/**
 * @description
 * A hook that allows for changing queries in a URL.
 */
export const useRouteQuery = <T>() => {
	const route = useRoute();
	const router = useRouter();

	const handleChangeQueries = (data: LocationQueryRaw): LocationQueryRaw => {
		let newQueries = cloneDeep({ ...route.query, ...data }) as LocationQueryRaw;

		for (const [key, value] of Object.entries(newQueries)) {
			// 1. We remove a value when it has empty
			if (!value) {
				const { [key]: _, ...others } = newQueries;
				newQueries = { ...others };

				continue;
			}

			// 2. update the value or create a new one
			newQueries = { ...newQueries, [key]: value };
		}

		router.push({ query: newQueries });

		return route.query;
	};

	return {
		queries: route.query as Partial<T>,
		setQueries: handleChangeQueries,
	} as const;
};
