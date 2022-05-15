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
        try {
          const params = {
            accessToken: TokenService.getLocalAccessToken(),
            refreshToken: TokenService.getLocalRefreshToken(),
          }
          const rs = await axios.post('/refreshtoken', params)
          console.log('interceptor 리프레시 토큰 체크 결과', rs)
          const { accessToken } = rs.data
          store.dispatch('authModule/refreshToken', accessToken)
          TokenService.updateLocalAccessToken(accessToken)
        } catch (_error) {
          console.log('axios intercepter refreshToken errror', _error)
          const accessToken = TokenService.getLocalAccessToken()
          const refreshToken = TokenService.getLocalRefreshToken()
          if (!(accessToken && refreshToken)) {
            alert('토큰 만료로 인해 로그아웃 되었습니다.')
            window.location.reload()
          }
          // return Promise.reject(_error)
        }
      }
    }

    return Promise.reject(error)
  }
)

export default axios
