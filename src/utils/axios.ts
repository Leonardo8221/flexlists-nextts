import axios from 'axios';
import { de } from 'date-fns/locale';
import { setLoading } from 'src/redux/actions/adminAction';
import store from 'src/redux/store';
import { PATH_AUTH } from 'src/routes/paths';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL });

axiosInstance.interceptors.request.use(function (config) {
  store.dispatch(setLoading(true))
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false))
    //console.log('response1')
    return response
  },
  async (error) => {
    const originalRequest = error.config
    store.dispatch(setLoading(false))
    if (
      error.response.status === 401 &&
       (!originalRequest.url.includes('auth/verifyToken')) &&
       (!originalRequest.url.includes('auth/resendSignupEmail')) &&
       (!originalRequest.url.includes('auth/verifySignup')) &&
        (!originalRequest.url.includes('auth/verifyPasswordChange')) &&
        (!originalRequest.url.includes('auth/forgotPassword')) &&
        (!originalRequest.url.includes('auth/resetPassword')) &&
        (!originalRequest.url.includes('auth/registerExisting'))
    ) {
      window.location.href = PATH_AUTH.login//'/auth/login';
      return await Promise.reject(error)
    }
    //console.log('error', error.response.data)
    return await Promise.resolve(error.response)
    //return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

async function get<T>(url: string, params?: any) {
  try {
    return await axiosInstance.get<T>(url, { params })
  } catch (e: any) {
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function post<T>(url: string, data?: any) {
  try {
    return await axiosInstance.post<T>(url, data)
  } catch (e: any) {
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function axiosDelete<T>(url: string, params?: any) {
  try {
    return await axiosInstance.delete<T>(url, { params })
  } catch (e: any) {
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

export default { get, post, delete: axiosDelete };
