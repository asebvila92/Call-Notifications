import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
} from '../constants';
import { login } from '../../api/authService';

export const invokeLogin = (dispatch, username, password) => {
  dispatch({
    type: GET_TOKEN_PENDING,
  })
  
  login(username, password).then(
    (response) => {
      dispatch({
        type: GET_TOKEN_SUCCESS,
        payload: response.data
      })
    },
    (err) => {
      dispatch({
        type: GET_TOKEN_ERROR,
        payload: err
      })
    }
  )
}