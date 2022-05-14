import axios from '@/plugins/axios/axios'

class AuthService {
  async login(_user: LoginForm) {
    const result1 = await axios
      .post('/signin', _user)
      .then((res) => {
        console.log('login result : ', res)
        return res.data
      })
      .catch((error) => {
        alert(error)
      })
    if (result1.resltCd == '0000') {
      localStorage.setItem('user', JSON.stringify(result1.data))
      console.log('localStorage 확인', localStorage)
    }
    return result1
  }

  async logout() {
    localStorage.removeItem('user')
  }

  async register(_user: User) {
    const result = await axios
      .post('/signup', _user)
      .then((res) => {
        console.log('signUp result', res)
        return res.data
      })
      .catch((error) => {
        alert(error)
      })
    return result
  }
}

export default new AuthService()
