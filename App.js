import React, { useEffect } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers'
import AppContainer from './AppContainer';
import { registerForPushNotificationsAsync } from './src/helpers/notifications';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  })
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}


