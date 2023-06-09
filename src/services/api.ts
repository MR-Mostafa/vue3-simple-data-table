import axios from 'axios';

export const API = axios.create({
	baseURL: import.meta.env.GB_BASE_URL,
	timeout: +import.meta.env.GB_TIMEOUT, // 15s
	headers: {
		'content-type': 'application/json',
	},
	responseType: 'json',
});

API.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor
API.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);
