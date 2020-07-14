import {
    GET_DELIVERIES_PENDING,
    GET_DELIVERIES_SUCCESS,
    GET_DELIVERIES_ERROR 
  } from '../constants';
  
  const initialState = {
    isLoading: false,
    errorGetDeliveries: null,
  }
  const deliveriesReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_DELIVERIES_PENDING:
          return {
            ...state,
            isLoading: true,
            errorGetDeliveries: null
          }
        case GET_DELIVERIES_SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: false,
            deliveries: action.payload.data
          }
        case GET_DELIVERIES_ERROR:
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: true,
          }
        default: 
          return state
    }
  } 
  
  export default deliveriesReducer;