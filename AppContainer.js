import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/authStackNavigator';
import Login from './src/screens/login';
import { getUserDataFromStorage } from './src/redux/actions';

export default function AppContainer() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const isOpening = useSelector((store) => store.auth.isOpening);

  useEffect(() => {
    getUserDataFromStorage(dispatch)
  }, [])

  return (
    <NavigationContainer>
      {
        token ? <AuthStackNavigator /> : <Login />
      }
    </NavigationContainer>
  );
}