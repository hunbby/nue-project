import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('request interceptor!!!!', config)
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
    response.headers['Access-Control-Allow-Origin'] = '*'
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
