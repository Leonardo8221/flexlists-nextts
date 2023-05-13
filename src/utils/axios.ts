import axios from 'axios';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({withCredentials: true,baseURL:process.env.NEXT_PUBLIC_FLEXLIST_API_URL});

axiosInstance.interceptors.request.use(function (config) {
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
