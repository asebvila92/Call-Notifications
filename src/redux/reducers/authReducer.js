import {
  GET_TOKEN_PENDING,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
} from '../constants';

const initialState = {
  isLoading: false,
  errorAuth: null,
}
const authReducer = (state = initialState, action) => {
  switch(action.type){
      case GET_TOKEN_PENDING: 
        return {
          ...state,
          isLoading: true,
          errorAuth: null
        }
      case GET_TOKEN_SUCCESS:
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
      default: 
        return state
  }
} 

export default authReducer;