
import axios, { AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const Axios = (async () => {
  const res = await axios('requestUrl.json')
  const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? res.data.REQUEST_URL : '/api',
    timeout: 20000
  })

  instance.interceptors.response.use(function (response: AxiosResponse) {
      if (response.status === 200) {
        return response.data
      }
      return response
    }, function (error: any) {
      if (error.response) {
        switch(error.response.status) {
          case 400: error.message = '请求错误'; break;
          case 401: error.message = '未授权，请登录'; break;
          case 403: error.message = '拒绝访问'; break;
          case 404: error.message = `请求地址出错: ${error.response.config.url}`; break;
          case 408: error.message = '请求超时'; break;
          case 500: error.message = '服务器内部错误'; break;
          case 501: error.message = '服务未实现'; break;
          case 502: error.message = '网关错误'; break;
          case 503: error.message = '服务不可用'; break;
          case 504: error.message = '网关超时'; break;
          case 505: error.message = 'HTTP版本不受支持'; break;
          default: break;
        }
        ElMessage.error(error.message)
      } else {
        ElMessage.error('网络异常')
      }
      return Promise.reject(error);
  })
  return instance
})()

export default Axios

