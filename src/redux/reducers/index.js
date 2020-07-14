import { combineReducers } from 'redux';
import auth from './authReducer';
import deliveries from './deliveriesReducer'

export default combineReducers({
    auth,
    deliveries,
})