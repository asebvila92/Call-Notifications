import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers'
import AppContainer from './AppContainer';
import { registerForPushNotificationsAsync, getContactsPermissions } from './src/helpers/permissions';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
    getContactsPermissions()
  })
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}


