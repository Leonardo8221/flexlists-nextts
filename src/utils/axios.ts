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
  PATH_AUTH_API.registerExisting
]
const axiosInstance = axios.create({ withCredentials: true, baseURL: process.env.NEXT_PUBLIC_FLEXLIST_API_URL });

axiosInstance.interceptors.request.use(function (config) {
  store.dispatch(setLoading(true))
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false))
    if(response && response.data && response.data.code === 999){
      response.data.message = 'Unknown Error, please try again.'
    }
    if (
      response && response.data && response.data.code=== 401 
    ) {
      const url = response?.config?.url;
      if(url &&!ignore.some((path: string) => url.indexOf(path) > -1))
      {
        window.location.href = PATH_AUTH.login
      }
    }
    return response
  },
  async (error) => {

    const originalRequest = error.config
    store.dispatch(setLoading(false))
    if (
      error.response.status === 401 &&
      !ignore.some((path: string) => originalRequest.url?.indexOf(path) > -1)
    ) {
      window.location.href = PATH_AUTH.login//'/auth/login';
      return await Promise.reject(error)
    }

    console.log('error', error.response.data)
    return await Promise.resolve(error.response)
    //return Promise.reject((error.response && error.response.data) || 'Something went wrong')
  }
);

async function get<T>(url: string, params?: any) {
  try {
    return await axiosInstance.get<T>(url, { params })
  } catch (e: any) {
    store.dispatch(setLoading(false))
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function post<T>(url: string, data?: any,config?:any) {
  try {
    return await axiosInstance.post<T>(url, data,config)
  } catch (e: any) {
    store.dispatch(setLoading(false))
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

async function axiosDelete<T>(url: string, params?: any) {
  try {
    return await axiosInstance.delete<T>(url, { params })
  } catch (e: any) {
    store.dispatch(setLoading(false))
    return { data: { code: e.code ?? 999, isSuccess: e.isSuccess, message: e.message ?? 'Unknown Error, please try again.', data: e.data ?? e } }
  }
}

export default { get, post, delete: axiosDelete };
