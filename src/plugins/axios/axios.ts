import axios from 'axios'
import { useStore } from 'vuex'

import TokenService from '@/services/token/token-service'

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
axios.defaults.withCredentials = true

const store = useStore()

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request interceptor', config)
    const token = TokenService.getLocalAccessToken()
    if (!config.headers) {
      config.headers = {}
    }
    config.headers['accessToken'] = token
    return config
  },
  function (error) {
    // Do something with request error
    console.log('reauest interceptor ERROR', error)
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response interceptor')
    return response
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response interceptor ERROR', error)

    const originalConfig = error.config
    if (error.response.status == 401) {
      if (originalConfig.url !== '/signin') {
        TokenService.refreshtokenCheck()
      }
    }

    return Promise.reject(error)
  }
)

export default axios
