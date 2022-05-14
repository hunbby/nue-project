class TokenService {
  getLocalRefreshToken() {
    const user = this.localStorageGetUserData()
    return user?.refreshToken
  }

  getLocalAccessToken() {
    const user = this.localStorageGetUserData()
    return user?.accessToken
  }

  updateLocalAccessToken(token: string) {
    const user = this.localStorageGetUserData()
    user.accessToken = token
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser() {
    return this.localStorageGetUserData()
  }

  setUser(user: User) {
    console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }

  localStorageGetUserData() {
    let result = null
    const user = localStorage.getItem('user')
    if (user !== null) {
      result = JSON.parse(user)
    } else {
      return null
    }
    return result
  }
}

export default new TokenService()
