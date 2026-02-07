// src/utils/request.js
import axios from 'axios';

// 创建自定义实例
export const service = axios.create({
  baseURL: 'http://127.0.0.1:3000', // 从环境变量读取基础地址
  timeout: 15000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么
    // if (store.getters.token) {
    //   config.headers['Authorization'] = `Bearer ${store.getters.token}`;
    // }
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // 自定义状态码验证（根据后端约定）
    if (res.code !== 200) {
      console.error(res.message || 'Error');
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  (error) => {
    // 处理HTTP网络错误
    let message = '';
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          message = '认证失败，请重新登录';
          break;
        case 403:
          message = '当前操作没有权限';
          break;
        case 404:
          message = '资源不存在';
          break;
        default:
          message = '网络异常，请稍后重试';
      }
    }
    console.error(message);
    return Promise.reject(error);
  }
);
