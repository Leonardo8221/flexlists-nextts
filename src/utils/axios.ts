import axios from 'axios';
import { setLoading } from 'src/redux/actions/adminAction';
import store from 'src/redux/store';
import { PATH_ADMIN_API, PATH_AUTH, PATH_AUTH_API } from 'src/routes/paths';
import { FlexlistsError, Errors, FlexlistsSuccess } from './responses';
// ----------------------------------------------------------------------
const ignore = [
  PATH_AUTH_API.verifyToken,
  PATH_AUTH_API.resendSignupEmail,
  PATH_AUTH_API.verifySignup,
  PATH_AUTH_API.verifyPasswordChange,
  PATH_AUTH_API.forgotPassword,
  PATH_AUTH_API.resetPassword,
  PATH_AUTH_API.registerExisting,
  PATH_AUTH_API.loginExisting,
  PATH_ADMIN_API.getLanguages,
  PATH_ADMIN_API.getSearchTypes
]
const loadingIgnore = [
  "/",
]
const axiosInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL });
const axiosSSRInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL_SSR ?? process.env.NEXT_PUBLIC_FLEXLIST_API_URL });

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
    if (response && response.data && response.data.code === 999) {
      response.data.message = 'Unknown Error, please try again.'
    }
    if (!onServer && response && response.data && response.data.code === 401) {
      const url = response?.config?.url;
      if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
        window.location.href = PATH_AUTH.login
      }
    }
    if (!onServer && response && response.data && response.data.code === 500) {
      const url = response?.config?.url;
      if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
        window.location.href = "/500"
        new FlexlistsError('Unknown Error, please try again.', Errors.UnknownError, response.data.data)
        return response
      }
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (!onServer) store.dispatch(setLoading(false))
    if (!onServer &&
      (!error.response ||
        (error.response.status === 500 && !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1))
      )
    ) {

      window.location.href = '/500'
      new FlexlistsError('Unknown Error, please try again.', Errors.UnknownError, error.response?.data)
      return await Promise.reject(error)
    }
    if (
      !onServer && error.response.status === 401 &&
      !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1)
    ) {
      window.location.href = PATH_AUTH.login//'/auth/login';
      return await Promise.reject(error)
    }

    return await Promise.resolve(error.response)
    //return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

axiosSSRInstance.interceptors.request.use(function (config) {
  if (!onServer && !loadingIgnore.some((path: string) => window.location?.pathname === path)) {
    store.dispatch(setLoading(true))
  }

  return config;
});
axiosSSRInstance.interceptors.response.use(
  async (response) => {
    if (!onServer) store.dispatch(setLoading(false))
    if (response && response.data && response.data.code === 999) {
      response.data.message = 'Unknown Error, please try again.'
    }
    if (!onServer && response && response.data && response.data.code === 401) {
      const url = response?.config?.url;
      if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
        window.location.href = PATH_AUTH.login
      }
    }
    if (!onServer && response && response.data && response.data.code === 500) {
      const url = response?.config?.url;
      if (url && !ignore.some((path: string) => url.indexOf(path) > -1)) {
        window.location.href = "/500"
        new FlexlistsError('Unknown Error, please try again.', Errors.UnknownError, response.data.data)
        return response
      }
    }
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (!onServer) store.dispatch(setLoading(false))
    if (!onServer &&
      (!error.response ||
        (error.response.status === 500 && !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1))
      )
    ) {

      window.location.href = '/500'
      new FlexlistsError('Unknown Error, please try again.', Errors.UnknownError, error.response?.data)
      return await Promise.reject(error)
    }
    if (
      !onServer && error.response.status === 401 &&
      !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1)
    ) {
      window.location.href = PATH_AUTH.login//'/auth/login';
      return await Promise.reject(error)
    }

    return await Promise.resolve(error.response)
    //return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);


async function get<T>(url: string, params?: any, ssr = false) {
  try {
    return await (ssr ? axiosSSRInstance : axiosInstance).get<T>(url, params)
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    console.log(e)
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function post<T>(url: string, data?: any, config?: any, ssr = false) {
  try {
    return await (ssr ? axiosSSRInstance : axiosInstance).post<T>(url, data, config)
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    console.log(e)
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function axiosDelete<T>(url: string, params?: any, ssr = false) {
  try {
    return await (ssr ? axiosSSRInstance : axiosInstance).delete<T>(url, { params })
  } catch (e: any) {
    if (!onServer) store.dispatch(setLoading(false))
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess ?? false, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

export default { get, post, delete: axiosDelete };
