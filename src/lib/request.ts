import axios, { AxiosInstance } from 'axios';
import { tansParams } from '@/lib/utils'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 10000
});
http.interceptors.request.use(config => {
  // 可以在这里添加身份验证头等
  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?" + tansParams(config.params);
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

http.interceptors.response.use(response => response.data, error => {
  // 处理错误逻辑
  return Promise.reject(error);
});

export default http