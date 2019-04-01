/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
import router from '../router/router'
import {getToken, setToken, removeToken} from '@/util/auth'
import {Message} from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
// 超时时间
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=utf-8';
axios.defaults.withCredentials = true
NProgress.configure({showSpinner: true})// NProgress Configuration
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  if (store.getters.access_token) {
    config.headers['Authorization'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error)
})
// HTTPresponse拦截:response 参数如下： 其中 data 为 我们封装后的数据
// config: {adapter: ƒ, transformRequest: {…}, transformResponse: {…}, timeout: 30000, xsrfCookieName: "XSRF-TOKEN", …}
// data: {total: 0, size: 20, pages: 0, current: 1, records: Array(5)}
// headers: {pragma: "no-cache", date: "Thu, 24 Jan 2019 03:48:55 GMT", content-encoding: "gzip", x-content-type-options: "nosniff", x-powered-by: "Express", …}
// request: XMLHttpRequest {onreadystatechange: ƒ, readyState: 4, timeout: 30000, withCredentials: true, upload: XMLHttpRequestUpload, …}
// status: 200
// statusText: "OK"
axios.interceptors.response.use(data => {
  NProgress.done();
  data = data.data
  //response 返回为200状态数据处理，解析data 中的code参数
  if (data.code == 200) {
    return data.data
  }
  const message = data.message || errorCode[data.code] || errorCode['default']
  Message({
    message: message,
    type: 'error'
  })

  return Promise.reject(new Error(message));

}, error => {//response 返回非200状态数据处理
  NProgress.done()
  const errMsg = error.toString()
  const code = errMsg.substr(errMsg.indexOf('code') + 5)
  Message({
    message: errMsg || errorCode['default'],
    type: 'error'
  })

  if (parseInt(code) === 401) {
    store.dispatch('FedLogOut').then(() => {
      router.push({path: '/login'})
    })
  }

  return Promise.reject(new Error(error))
})

export default axios
