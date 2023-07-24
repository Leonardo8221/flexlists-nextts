import axios from 'axios';
import { setLoading } from 'src/redux/actions/adminAction';
import store from 'src/redux/store';
import { PATH_AUTH, PATH_AUTH_API } from 'src/routes/paths';
// ----------------------------------------------------------------------
const ignore = [
  PATH_AUTH_API.verifyToken,
  PATH_AUTH_API.resendSignupEmail,
  PATH_AUTH_API.verifySignup,
  PATH_AUTH_API.verifyPasswordChange,
  PATH_AUTH_API.forgotPassword,
  PATH_AUTH_API.resetPassword,
  PATH_AUTH_API.registerExisting,
  PATH_AUTH_API.loginExisting
]
const loadingIgnore = [
  "/",
]
const axiosInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL });

const onServer = typeof window === 'undefined'

axiosInstance.interceptors.request.use(function (config) {
  if (!onServer && !loadingIgnore.some((path: string) => window.location?.pathname === path)) {
    store.dispatch(setLoading(true))
  }

  return config;
});
axiosInstance.interceptors.response.use(
  async (response) => {
    if (!onServer) store.dispatch(setLoading(false))
    // if (response && response.data && response.data.code === 999) {
    //   response.data.message = 'Unknown Error, please try again.'
    // }
    // if (!onServer && response && response.data && response.data.code === 401) {
    //   const url = response?.config?.url;
    //   if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
    //     window.location.href = PATH_AUTH.login
    //   }
    // }
    // if (!onServer && response && response.data && response.data.code === 500) {
    //   const url = response?.config?.url;
    //   if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
    //     window.location.href = "/500"
    //     return response
    //   }
    // }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (!onServer) store.dispatch(setLoading(false))
    // if (!onServer &&
    //   (!error.response ||
    //     (error.response.status === 500 && !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1))
    //   )
    // ) {

    //   window.location.href = '/500'
    //   return await Promise.reject(error)
    // }
    // if (
    //   !onServer && error.response.status === 401 &&
    //   !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1)
    // ) {
    //   window.location.href = PATH_AUTH.login//'/auth/login';
    //   return await Promise.reject(error)
    // }

    return await Promise.resolve(error.response)
    //return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

async function get<T>(url: string, params?: any) {
  try {
    return await axiosInstance.get<T>(url, { params })
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    console.log(e)
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function post<T>(url: string, data?: any, config?: any) {
  try {
    return await axiosInstance.post<T>(url, data, config)
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    console.log(e)
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function axiosDelete<T>(url: string, params?: any) {
  try {
    return await axiosInstance.delete<T>(url, { params })
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

export default { get, post, delete: axiosDelete };
