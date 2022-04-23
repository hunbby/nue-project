import { Module } from 'vuex'

import AuthService from '@/services/auth/auth-service'
import { RootState } from '@/store/index'

export interface AuthModuleState {
  status: {
    loggedIn: boolean
  }
  user: {
    userId: string
    userPw: string
    pwChangeDt: string
    creationId: string
    role: string
    accessToken: string | undefined
    refreshToken: string
  } | null
}

export const authModule: Module<AuthModuleState, RootState> = {
  namespaced: true,
  state: {
    status: {
      loggedIn: false,
    },
    user: {
      userId: '',
      userPw: '',
      pwChangeDt: '',
      creationId: '',
      role: '',
      accessToken: '',
      refreshToken: '',
    },
  },
  actions: {
    login({ commit }, user: LoginForm) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user: User) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSuccess')
          return Promise.resolve(response)
        },
        (error) => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    },
    refreshToken({ commit }, accessToken) {
      commit('refreshToken', accessToken)
    },
    tokenCheck({ commit }) {
      commit('tokenCheck')
    },
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    loginFailure(state) {
      state.status.loggedIn = false
      state.user = null
    },
    logout(state) {
      state.status.loggedIn = false
      state.user = null
    },
    registerSuccess(state) {
      state.status.loggedIn = false
    },
    registerFailure(state) {
      state.status.loggedIn = false
    },
    refreshToken(state, accessToken) {
      state.status.loggedIn = true
      if (state.user != null) {
        state.user = { ...state.user, accessToken: accessToken }
      }
    },
    tokenCheck(state) {
      let result = null
      const user = localStorage.getItem('user')
      if (user !== null) {
        result = JSON.parse(user).accessToken
      }
      if (result) {
        state.status.loggedIn = true
      }
    },
  },
  getters: {
    logginInChekc: (state) => {
      return state.status.loggedIn
    },
  },
}
