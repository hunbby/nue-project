import { Module } from 'vuex'

import BoardService from '@/services/board/Board-service'
import { RootState } from '@/store/index'

export interface BoardModuleState {
  status: {
    result: boolean
  }
}

export const boardModule: Module<BoardModuleState, RootState> = {
  namespaced: true,
  state: {
    status: {
      result: false,
    },
  },
  actions: {
    boardInsert({ commit }, params: unknown) {
      return BoardService.insertBoard(params).then(
        (res) => {
          commit('boardInsertSuccess', res)
          return Promise.resolve(res)
        },
        (error) => {
          commit('boardInsertFail')
          return Promise.reject(error)
        }
      )
    },
  },
  mutations: {
    boardInsertSuccess(state) {
      state.status.result = true
    },
    boardInsertFail(state) {
      state.status.result = false
    },
  },
  getters: {},
}
