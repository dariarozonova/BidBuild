// enable store
import Cookies from 'js-cookie'

export const state = () => ({
    authenticated: false,
    user: {
        name: '',
        surname: ''
    }
})
  
export const mutations = {
    SET_AUTHENTICATED(state, payload) {
        state.authenticated = payload
    },

    SET_USER (state, user) {
        state.user = user
    }

}

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    // check if token exists in local storage
    const token = Cookies.get('token')
    if (!token) {
      return;
    }
    // send request to validate token
    try {
      const response = await this.$axios.post('/api/validateToken', { token });
      if (response.status === 200) {
        // set authenticated state to true
        commit('SET_AUTHENTICATED', true);
        // store user's name and surname in the store
        commit('SET_USER', { name: response.data.name, surname: response.data.surname });
      }
    } catch (error) {
      console.log(error);
    }
  }
}