import {
    DELIVERIES_PENDING,
    DELIVERIES_PENDING_UPDATE,
    CLEAN_FLAGS,
    GET_DELIVERIES_SUCCESS,
    GET_DELIVERIES_ERROR,
    ADD_DELIVERY_SUCCESS,
    ADD_DELIVERY_ERROR,
    DELETE_DELIVERY_SUCCESS,
    DELETE_DELIVERY_ERROR,
    UPDATE_DELIVERY_SUCCESS,
    UPDATE_DELIVERY_ERROR 
  } from '../constants';
  
  const initialState = {
    isLoading: false,
    isLoadingUpdate: false,
    errorUpdate: false,
    errorGetDeliveries: false,
    errorAddDelivery: false,
    errorDelete: false,
    lastAdded: '',
    deleted: false,
    updated: false,
  }
  const deliveriesReducer = (state = initialState, action) => {
    switch(action.type){
        case CLEAN_FLAGS:
          return {
            ...state,
            lastAdded: '',
            deleted: null,
            errorDelete: null,
            updated: null,
            errorUpdate: null
          }
        case DELIVERIES_PENDING:
          return {
            ...state,
            isLoading: true,
            errorGetDeliveries: null,
            errorAddDelivery: null,
            errorDelete: null,
            lastAdded: ''
          }
        case DELIVERIES_PENDING_UPDATE: {
          return {
            ...state,
            isLoadingUpdate: true,
            errorUpdate: null,
            errorAddDelivery: null,
            errorDelete: null,
          }
        }  
        case GET_DELIVERIES_SUCCESS: 
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: false,
            deliveries: action.payload.data,
          }
        case GET_DELIVERIES_ERROR:
          return {
            ...state,
            isLoading: false,
            errorGetDeliveries: true,
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
            }
          case DELETE_DELIVERY_SUCCESS:
            return {
              ...state,
              isLoading: false,
              errorDelete: false,
              deleted: true,
              updated: false,
              errorUpdate: false,
              deliveries: action.payload.deliveries
            }
          case DELETE_DELIVERY_ERROR:
            return {
              ...state,
              isLoading: false,
              errorDelete: true,
              deleted: false,
              updated: false,
              errorUpdate: false,
            }
          case UPDATE_DELIVERY_SUCCESS:
            return {
              ...state,
              isLoadingUpdate: false,
              errorUpdate: false,
              updated: true,
              deleted: false,
              errorDelete: false,
              deliveries: action.payload.data
            }
          case UPDATE_DELIVERY_ERROR:
            return {
              ...state,
              isLoadingUpdate: false,
              errorUpdate: true,
              updated: false,
              deleted: false,
              errorDelete: false
            }      
        default: 
          return state
    }
  } 
  
  export default deliveriesReducer;