import api from '../api/api'

export default {
  login(username, password) {
    return api.post('/login', { username, password })
  },
  register(username, password) {
    return api.post('/register', { username, password })
  }
}
