import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  SET_DATA_FROM_ASYNCSTORAGE_PENDING,
  SET_DATA_FROM_ASYNCSTORAGE,
  SET_NULL_FROM_ASYNCSTORAGE,
  LOG_OUT 
} from '../constants';

import { removeData, saveObject } from '../../helpers/asyncStorage';

const initialState = {
  isLoading: false,
  errorAuth: null,
  isOpening: false
}
const authReducer = (state = initialState, action) => {
  switch(action.type){
      case SET_DATA_FROM_ASYNCSTORAGE_PENDING:
        return {
          ...state,
          isOpening: true,
        }
      case GET_TOKEN_PENDING: 
        return {
          ...state,
          isLoading: true,
          errorAuth: null
        }
      case GET_TOKEN_SUCCESS:
        saveObject("@userData", {...action.payload.userData, token: action.payload.token}); // save data in AsyncStorage
        return {
          ...state,
          isLoading: false,
          errorAuth: false,
          token: action.payload.token,
          userData: action.payload.userData,
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
          userData: data
        }
      case SET_NULL_FROM_ASYNCSTORAGE:
        return {
          ...state,
          isOpening: false,
          errorAuth: false
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