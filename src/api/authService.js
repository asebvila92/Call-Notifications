import axios from 'axios';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';
import { API_URL } from '../config/api.config'

export const login = async (username, password) => {
  const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let parameters = {
    username: username.toLowerCase(),
    password: password
  }
  
  if(status == 'granted'){
    let deviceId = (await Notifications.getExpoPushTokenAsync()).data;;
    deviceId = deviceId.substr(18, 22);
    parameters.deviceId = deviceId;
  }
  
  return axios.post(`${API_URL}/auth/login`, parameters)
}

export const getMessageById = (userToken, messageId) => {
  return axios.get(`${API_URL}/messages/${messageId}`, {
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  })
}

export const updateMessageById = (userToken, message) => {
  return axios.put(`${API_URL}/messages/${message.id}`, message,{
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  })
}