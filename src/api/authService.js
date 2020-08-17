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