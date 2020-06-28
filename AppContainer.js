import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/authStackNavigator';
import Login from './src/screens/login';

export default function AppContainer() {
  return (
    <NavigationContainer>
      {
        <AuthStackNavigator/>
      }
    </NavigationContainer>
  );
}