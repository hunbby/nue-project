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
    return res.data
  })
  if (result1.resltCd == '0000') {
    localStorage.setItem('user', JSON.stringify(result1.data))
  } else {
    alert('로그인 에러 발생 로그 확인 필요')
    console.log(result1)
    return false
  }
  console.log('localStorage 확인', localStorage)
}
