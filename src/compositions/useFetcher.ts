import { type AxiosRequestConfig } from 'axios';
import { reactive, ref, toRefs } from 'vue';

import debounce from 'lodash/debounce';

import { API } from '~src/services/api';

type FetcherProps<D> = Pick<AxiosRequestConfig<D>, 'data' | 'url'>;

const DEFAULT_METHOD = 'get';

export const useFetcher = <R = unknown, D = unknown>(baseConfig: AxiosRequestConfig<D> = {}) => {
	const result = ref<R | null>(null);
	const state = reactive({
		isLoading: false,
		isSuccess: false,
		hasError: false,
	});

	const fetcher = debounce(async ({ url, data = {} as D }: FetcherProps<D> = {}) => {
		if (!baseConfig.url && !url) {
			throw new Error('The URL does not exist.');
		}

		state.isLoading = true;

		const fetcherConfig = { data, url: url || baseConfig.url };

		try {
			const res = await API(Object.assign({ method: DEFAULT_METHOD }, baseConfig, fetcherConfig));
			result.value = res.data;
			state.isSuccess = true;
			state.hasError = false;
		} catch (e) {
			state.hasError = true;
			state.isSuccess = false;
		} finally {
			state.isLoading = false;
		}
	}, 500);

	return { ...toRefs(state), data: result, fetcher };
};
