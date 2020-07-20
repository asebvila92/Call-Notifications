import {
  DELIVERIES_PENDING,
  GET_DELIVERIES_SUCCESS,
  GET_DELIVERIES_ERROR,
  ADD_DELIVERY_SUCCESS,
  ADD_DELIVERY_ERROR,
  DELETE_DELIVERY_SUCCESS,
  DELETE_DELIVERY_ERROR
} from '../constants';
import { getAllDeliveries, addDelivery, deleteDelivery } from '../../api/deliveriesService';

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
      dispatch({
        type: ADD_DELIVERY_SUCCESS,
        payload: response.data
      })
    },
    (err) => {
      dispatch({
        type: ADD_DELIVERY_ERROR,
        payload: err
      })
    }
  )  
}

export const invokeDeleteDelivery = (dispatch, userToken, idDelivery) => {
  dispatch({
    type: DELIVERIES_PENDING,
  })

  deleteDelivery(userToken, idDelivery).then(
    (response) => {
      dispatch({
        type: DELETE_DELIVERY_SUCCESS,
        payload: response.data
      })
    },
    (err) => {
      dispatch({
        type: DELETE_DELIVERY_ERROR,
        payload: err
      })
    }
  )  
}