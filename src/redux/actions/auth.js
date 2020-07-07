import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  SET_DATA_FROM_ASYNCSTORAGE_PENDING,
  SET_DATA_FROM_ASYNCSTORAGE,
  SET_NULL_FROM_ASYNCSTORAGE,
  LOG_OUT 
} from '../constants';
import { login } from '../../api/authService';
import { getData } from '../../helpers/asyncStorage';

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

export const getUserDataFromStorage = (dispatch) => {
  dispatch({
    type: SET_DATA_FROM_ASYNCSTORAGE_PENDING,
  })

  getData("@userData").then(
    (response) => {
      dispatch({
        type: response != null ? SET_DATA_FROM_ASYNCSTORAGE : SET_NULL_FROM_ASYNCSTORAGE,
        payload: response
      })
    },
    (error) => {
      dispatch({
        type: SET_NULL_FROM_ASYNCSTORAGE
      })
    }
  )
}

export const invokeLogout = (dispatch) => {
  dispatch({
    type: LOG_OUT
  })
}