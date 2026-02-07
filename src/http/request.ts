import { service } from './http';

/**
 * 通用请求方法
 * @param {Object} options 请求配置
 */
function request(options) {
  return service({
    method: options.method || 'GET',
    url: options.url,
    data: options.data,
    params: options.params,
    ...options,
  });
}

// 封装GET/POST快捷方法
export function axiosGet(url, params, options = {}) {
  return request({
    url,
    params,
    method: 'GET',
    ...options,
  });
}

export function axiosPost(url, data, options = {}) {
  return request({
    url,
    data,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...options,
    },
    ...options,
  });
}
