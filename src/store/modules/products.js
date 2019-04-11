import Fetch from '@/utils/fetch'

export default {
  namespaced: true,

  state: {
    loading: true,
    id: '',
    data: {}
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = Number(id)
    },

    SET_DATA: (state, data) => {
      state.data = data
    }
  },

  actions: {
    async getById({ commit, state }, id = state.id) {
      const data = await Fetch.get(`/v1/products/${id}`)
      commit('SET_DATA', data)
    },

    async saveById({ commit, state }) {
      try {
        await Fetch.put(`/v1/products/${state.id}`, state.data)
      } catch (e) {
        return
      }
    }
  }
}
