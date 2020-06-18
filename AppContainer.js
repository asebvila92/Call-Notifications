import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStackNavigator from './src/navigation/authStackNavigator';

export default function AppContainer() {
  return (
    <NavigationContainer>
      {
        <AuthStackNavigator/> 
      }
    </NavigationContainer>
  );
}