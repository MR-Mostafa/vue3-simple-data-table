import { type AxiosRequestConfig } from 'axios';
import { reactive, ref, toRefs } from 'vue';

import debounce from 'lodash/debounce';

import { API } from '~src/services/api';

type AxiosConfig<D> = Omit<AxiosRequestConfig<D>, 'data'>;
type Data<D> = Pick<AxiosRequestConfig<D>, 'data'>;

const DEFAULT_METHOD = 'get';

export const useFetcher = <R = unknown, D = unknown>(url: string, config: AxiosConfig<D> = {}) => {
	if (!url || typeof url !== 'string') {
		throw new Error('The URL does not exist or its type is not string');
	}

	const result = ref<R | null>(null);
	const state = reactive({
		isLoading: false,
		isSuccess: false,
		hasError: false,
	});

	const newConfig: AxiosRequestConfig<D> = Object.assign({ method: DEFAULT_METHOD }, config, { url });

	const fetcher = debounce(async (newData: Data<D> = {}) => {
		state.isLoading = true;

		try {
			const res = await API(Object.assign(newConfig, { data: newData }));
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
