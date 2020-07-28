import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthStackNavigator from './src/navigation/authStackNavigator';
import Login from './src/screens/login';
import ViewIsLoading from './src/components/layout/viewIsLoading';
import { getUserDataFromStorage } from './src/redux/actions';

export default function AppContainer() {
  const dispatch = useDispatch();
  const token = useSelector((store) => store.auth.token);
  const isOpening = useSelector((store) => store.auth.isOpening);

  useEffect(() => {
    getUserDataFromStorage(dispatch)
  }, [])

  return (
    isOpening ?
      <ViewIsLoading />
    :
      <SafeAreaProvider> 
        <NavigationContainer>
          {
            token ? <AuthStackNavigator /> : <Login />
          }
        </NavigationContainer>
      </SafeAreaProvider> 
  );
}