import {
  DELIVERIES_PENDING,
  GET_DELIVERIES_SUCCESS,
  GET_DELIVERIES_ERROR,
  ADD_DELIVERY_SUCCESS,
  ADD_DELIVERY_ERROR
} from '../constants';
import { getAllDeliveries, addDelivery } from '../../api/deliveriesService';

export const invokeGetDeliveries = (dispatch, userToken) => {
  dispatch({
    type: DELIVERIES_PENDING,
  })
  
  getAllDeliveries(userToken).then(
    (response) => {
      dispatch({
        type: GET_DELIVERIES_SUCCESS,
        payload: response.data
      })
    },
    (err) => {
      dispatch({
        type: GET_DELIVERIES_ERROR,
        payload: err
      })
    }
  )
}

export const invokeAddDelivery = (dispatch, userToken, delivery) => {
  dispatch({
    type: DELIVERIES_PENDING,
  })

  addDelivery(userToken, delivery).then(
    (response) => {
      console.log(response.data)
      dispatch({
        type: ADD_DELIVERY_SUCCESS,
        payload: response.data
      })
    },
    (err) => {
      console.log(err)
      dispatch({
        type: ADD_DELIVERY_ERROR,
        payload: err
      })
    }
  )  
}