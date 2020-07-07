import React from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/authStackNavigator';
import Login from './src/screens/login';

export default function AppContainer() {
  const token = useSelector((store) => store.auth.token);
  return (
    <NavigationContainer>
      {
        token ? <AuthStackNavigator /> : <Login />
      }
    </NavigationContainer>
  );
}