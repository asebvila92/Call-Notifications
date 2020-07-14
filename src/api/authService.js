import axios from 'axios';
import { API_URL } from '../config/api.config'

export const login = (username, password) => {
  return axios.post(`${API_URL}/auth/login`, {
    username: username.toLowerCase(),
    password: password,
    deviceId: '5555'
  })
}