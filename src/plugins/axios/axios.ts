import axios from 'axios'
import { useStore } from 'vuex'

import TokenService from '@/services/token/token-service'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
// axios.defaults.baseURL = 'http://localhost:18090'

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
    config.headers['Access-Control-Allow-Origin'] = '*'
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
    response.headers['Access-Control-Allow-Origin'] = '*'
    console.log('response interceptor')
    return response
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('response interceptor ERROR', error)

    const originalConfig = error.config

    if (originalConfig.url !== '/api/cms/signin' && originalConfig._retry) {
      originalConfig._retry = true

      try {
        const rs = await axios.post('/api/cms/refreshtoken', {
          accessToken: TokenService.getLocalAccessToken(),
          refreshToken: TokenService.getLocalRefreshToken(),
        })

        const { accessToken } = rs.data
        store.dispatch('authModule/refreshToken', accessToken)
        TokenService.updateLocalAccessToken(accessToken)
      } catch (_error) {
        console.log('axios intercepter refreshToken errror', _error)
        return Promise.reject(_error)
      }
    }

    return Promise.reject(error)
  }
)

export default axios
