import axios from 'axios';
import store from '../store';
import { tokenChange } from '../actions/loginoutActions';

const axiosInstance = axios.create({
	baseURL: 'https://sentry-replica.herokuapp.com/api/',
});

axiosInstance.interceptors.response.use(
	response => {
		// Do something with response data
		return response;
	},
	async error => {
		// Do something with response error

		const originalRequest = error.config;

		if (error.response.status === 401) {
			let res = await axios({
				method: 'post',
				 url: 'https://sentry-replica.herokuapp.com/api/refresh',
				//url: 'http://127.0.0.1:8848/api/',
				headers: {
					'Content-Type': 'application/json',
					refreshToken: store.getState().login.user.refreshToken,
				},
			});
			//save to locals
			localStorage.setItem('AccessToken', res.data.access);
			localStorage.setItem('RefreshToken', res.data.refresh);

			//dispatch Change token
			store.dispatch(tokenChange(res.data.access, res.data.refresh));
			originalRequest.headers.authorization = res.data.access;
			return axiosInstance(originalRequest);
		}

		return Promise.reject(error);
	}
);

const setHeader = headers => {
	return (headers = {
		...headers,
		authorization: store.getState().login.user.accessToken,
	});
};

export function get(url, headers = {}, params = {}) {
	headers = setHeader(headers);
	return axiosInstance({
		method: 'get',
		url,
		headers,
		params,
	});
}

export function post(url, data, headers = {}, params = {}) {
	headers = setHeader(headers);
	return axiosInstance({
		method: 'post',
		url,
		data,
		headers,
		params,
	});
}

export function put(url, headers = {}, params = {}) {
	headers = setHeader(headers);

	return axiosInstance({
		method: 'put',
		url,
		headers,
		params,
	});
}

export function remove(url, headers = {}) {
	headers = setHeader(headers);
	return axiosInstance({
		method: 'delete',
		url,
		headers,
	});
}
