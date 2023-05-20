import { AxiosError } from 'axios';

import { getFetcher } from '~src/services/api';

export const getAllProducts = async <T>() => {
	try {
		return await getFetcher<T>('/products?limit=100');
	} catch (error) {
		throw new Error(error instanceof AxiosError ? error.message : 'An unknown error has occurred');
	}
};
