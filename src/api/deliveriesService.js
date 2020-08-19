import axios from 'axios';
import { API_URL } from '../config/api.config'

export const getAllDeliveries = (userToken) => {
  return axios.get(`${API_URL}/deliveries/all`,{
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  })
}

export const addDelivery = (userToken, delivery) => {
  return axios.post(`${API_URL}/deliveries`, delivery, {
    headers: {
      Authorization: 'Bearer ' + userToken
    }
  })
}

export const deleteDelivery = (userToken, idDelivery) => {
  return axios.delete(`${API_URL}/deliveries/${idDelivery}`,{
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  })
}

export const updateDelivery = (userToken, idDelivery, delivery) => {
  return axios.put(`${API_URL}/deliveries/${idDelivery}`, delivery,{
    headers: {
      Authorization: 'Bearer ' + userToken,
    }
  })
}