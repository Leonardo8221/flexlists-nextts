import axios from 'axios';
import { setLoading } from 'src/redux/actions/adminAction';
import store from 'src/redux/store';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL });

axiosInstance.interceptors.request.use(function (config) {
  store.dispatch(setLoading(true))
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false))
    console.log('response1')
    return response
  },
  (error) => {
    const originalRequest = error.config
    store.dispatch(setLoading(false))
    if (
      error.response.status === 401 &&
      (!originalRequest.url.includes('auth/verifyToken'))
    ) {
      window.location.href = '/auth/login';
      return Promise.reject(error)
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

async function get<T>(url: string, params?: any) {
  try {
    return await axiosInstance.get<T>(url, { params })
  } catch (e: any) {
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e } }
  }
}

async function post<T>(url: string, data?: any) {
  try {
    return await axiosInstance.post<T>(url, data)
  } catch (e: any) {
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e } }
  }
}


export default { get, post };
