import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:18090/'

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request interceptor!!!!')
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('response interceptor!!!!')
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

export default axios
