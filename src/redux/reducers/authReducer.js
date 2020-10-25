import {
  CLEAN_AUTH_FLAGS,
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

import { removeData, saveObject } from '../../helpers/asyncStorage';

const initialState = {
  isLoading: false,
  errorAuth: null,
  errorChangeMsg: null,
  changeSuccess: null,
  token: null,
  isOpening: false
}
const authReducer = (state = initialState, action) => {
  switch(action.type){
      case CLEAN_AUTH_FLAGS: 
        return {
          ...state,
          isLoading: false,
          errorAuth: null,
          errorChangeMsg: null,
          changeSuccess: null,
        }
      case SET_DATA_FROM_ASYNCSTORAGE_PENDING:
        return {
          ...state,
          isOpening: true,
        }
      case CHANGE_MESSAGE_PENDING:
        return {
          ...state,
          isLoading: true,
          errorChangeMsg: null,
          changeSuccess: null,
        }  
      case GET_TOKEN_PENDING: 
        return {
          ...state,
          isLoading: true,
          errorAuth: null,
          token: null
        }
      case GET_TOKEN_SUCCESS:
        const token = action.payload.token;
        saveObject("@userData", {
          ...action.payload.userData, 
          token: token,
        }); // save data in AsyncStorage
        return {
          ...state,
          isLoading: false,
          errorAuth: false,
          token: action.payload.token,
          userData: action.payload.userData,
          messageForClients: token ? action.payload.clientsMessage.message : null
        }
      case GET_TOKEN_ERROR: 
        return {
          ...state,
          isLoading: false,
          errorAuth: true,
        }
      case SET_DATA_FROM_ASYNCSTORAGE:
        const data = JSON.parse(action.payload);
        return {
          ...state,
          isOpening: false,
          errorAuth: false,
          token: data.token,
          messageForClients: data.messageForClients,
          userData: data
        }
      case SET_NULL_FROM_ASYNCSTORAGE:
        return {
          ...state,
          isOpening: false,
          errorAuth: false
        }
      case GET_MESSAGE_SUCCESS:
        return {
          ...state,
          messageForClients: action.payload.data.message
        }
      case GET_MESSAGE_ERROR:
        return {
          ...state,
          messageForClients: 'Msj no disponible'
        }
      case CHANGE_MESSAGE_SUCCESS:
        return {
          ...state,
          isLoading: false,
          errorChangeMsg: false,
          changeSuccess: true,
          messageForClients: action.payload.data.message,
        }
      case CHANGE_MESSAGE_ERROR:
        return {
          ...state,
          isLoading: false,
          errorChangeMsg: true,
          changeSuccess: false,
        }    
      case LOG_OUT:
        removeData("@userData"); // remove data from AsyncStorage
        return {
          ...state,
          isLoading: false,
          token: null
        }    
      default: 
        return state
  }
} 

export default authReducer;