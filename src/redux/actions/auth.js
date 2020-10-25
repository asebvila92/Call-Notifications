import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  SET_DATA_FROM_ASYNCSTORAGE_PENDING,
  SET_DATA_FROM_ASYNCSTORAGE,
  SET_NULL_FROM_ASYNCSTORAGE,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_ERROR,
  CHANGE_MESSAGE_PENDING,
  CHANGE_MESSAGE_SUCCESS,
  CHANGE_MESSAGE_ERROR,
  LOG_OUT 
} from '../constants';
import { login, updateMessageById, getMessageById } from '../../api/authService';
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

export const invokeChangeMessage = (dispatch, userToken, message) => {
  dispatch({
    type: CHANGE_MESSAGE_PENDING,
  })

  updateMessageById(userToken, message).then(
    (response) => {
      dispatch({
        type: CHANGE_MESSAGE_SUCCESS,
        payload: response.data
      })
    },
    (error) => {
      dispatch({
        type: CHANGE_MESSAGE_ERROR
      })
    }
  )
}

export const invokeGetMessageForClients = (dispatch, userToken, messageId) => {
  getMessageById(userToken, messageId).then(
    (response) => {
      dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: response.data
      })
    },
    (error) => {
      dispatch({
        type: GET_MESSAGE_ERROR
      })
    }
  )
}

export const invokeLogout = (dispatch) => {
  dispatch({
    type: LOG_OUT
  })
}