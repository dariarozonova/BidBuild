// enable store
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