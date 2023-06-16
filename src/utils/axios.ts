import axios from 'axios';
import { setLoading } from 'src/redux/actions/adminAction';
import store from 'src/redux/store';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({withCredentials: true,baseURL:process.env.NEXT_PUBLIC_FLEXLIST_API_URL});


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
  (error) =>{
    const originalRequest = error.config
    store.dispatch(setLoading(false))
    if (
      error.response.status === 401 &&
      !originalRequest.url.includes('auth/verifyToken')
    ) 
    {
      window.location.href = '/auth/login';
      return Promise.reject(error)
    }
    Promise.reject((error.response && error.response.data) || 'Something went wrong')
  } 
);


export default axiosInstance;
