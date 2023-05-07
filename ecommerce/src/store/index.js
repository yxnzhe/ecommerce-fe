import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null,
  },
  getters: {
    currentUser: state => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    }
  },
  actions: {
    setCurrentUser({ commit }, user) {
      commit('setCurrentUser', user);
    }
  },
  modules: {
  }
})
