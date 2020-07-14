import {
  GET_DELIVERIES_PENDING,
  GET_DELIVERIES_SUCCESS,
  GET_DELIVERIES_ERROR
} from '../constants';
import { getAllDeliveries } from '../../api/deliveriesService';

export const invokeGetDeliveries = (dispatch, userToken) => {
  dispatch({
    type: GET_DELIVERIES_PENDING,
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