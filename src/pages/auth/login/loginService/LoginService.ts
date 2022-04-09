import axios from '@/plugins/axios/axios'

export interface LoginForm {
  userId: string
  userPw: string
  keepLoggedIn: boolean
  emailErrors: []
  passwordErrors: []
}

export async function login(params: LoginForm) {
  const result1 = await axios.post('/api/cms/signin', params).then((res) => {
    console.log('login result : ', res)
    return res
  })
  return result1
}
