import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: null,
    cart: {
      items: [],
    },
    isLoading: false,
  },
  getters: {
    currentUser: state => state.currentUser,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },

    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'));
      } else {
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },

    addToCart(state, item) {
      const exists = state.cart.items.filter(i => i.product.id === item.product.id);
      if (exists.length) {
        exists[0].quantity = parseInt(exists[0].quantity) + parseInt(item.quantity);
      } else {
        state.cart.items.push(item);
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },

    setIsLoading(state, status) {
      state.isLoading = status;
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
