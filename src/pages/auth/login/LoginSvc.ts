import LoginData from './LoginInf'

const loginSvc = () => {
  const testfunction = (item: LoginData) => {
    console.log('svc TEST', item)
  }
  return {
    testfunction,
  }
}

export default loginSvc
