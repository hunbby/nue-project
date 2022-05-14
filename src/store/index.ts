import { createStore } from 'vuex'

import { authModule } from '@/store/auth/auth.module'

export interface RootState {
  data: string
  isSidebarMinimized: boolean
}

export const store = createStore<RootState>({
  state: {
    data: 'root',
    isSidebarMinimized: false,
  },
  modules: {
    authModule,
  },
  mutations: {
    updateSidebarCollapsedState(state, isSidebarMinimized) {
      state.isSidebarMinimized = isSidebarMinimized
    },
  },
  actions: {
    //기본적으로 RootState에서 관리하기 때문에 각 모듈별로 네임스페이스를 지정해줘야 해당 모듈만 데이터 변화가능.
    setRootData({ commit }, data: string) {
      commit('setData', data)
    },
  },
  getters: {
    data: (state) => state.data,
  },
})
