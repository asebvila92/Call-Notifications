import {
    DELIVERIES_PENDING,
    CLEAN_LAST_ADDED,
    GET_DELIVERIES_SUCCESS,
    GET_DELIVERIES_ERROR,
    ADD_DELIVERY_SUCCESS,
    ADD_DELIVERY_ERROR 
  } from '../constants';
  
  const initialState = {
    isLoading: false,
    errorGetDeliveries: false,
    errorAddDelivery: false,
    lastAdded: ''
  }
  const deliveriesReducer = (state = initialState, action) => {
    switch(action.type){
        case CLEAN_LAST_ADDED:
          return {
            ...state,
            lastAdded: ''
          }
        case DELIVERIES_PENDING:
          return {
            ...state,
            isLoading: true,
            errorGetDeliveries: null,
            errorAddDelivery: null,
            lastAdded: ''
          }
        case GET_DELIVERIES_SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: false,
            deliveries: action.payload.data,
            lastAdded: ''
          }
        case GET_DELIVERIES_ERROR:
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: true,
            lastAdded: ''
          }
        case ADD_DELIVERY_SUCCESS:
          return {
            ...state,
            isLoading: false,
            errorAddDelivery: false,
            deliveries: action.payload.deliveries,
            lastAdded: action.payload.newLog
          }
          case ADD_DELIVERY_ERROR:
            return {
              ...state,
              isLoading: false,
              errorAddDelivery: true,
              lastAdded: ''
            }  
        default: 
          return state
    }
  } 
  
  export default deliveriesReducer;