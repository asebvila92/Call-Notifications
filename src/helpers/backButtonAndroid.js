// packages
import * as React from 'react';
import { BackHandler, Alert } from 'react-native';

/**
 * Attaches an event listener that handles the android-only hardware
 * back button
 */
const handleAndroidBackButton = screen => {
  if(screen === 'home'){
    BackHandler.addEventListener('hardwareBackPress', () => {
      exitAlert();
      return true;
    });
  }else{
    goBack()
  }
};


/**
 * Removes the event listener in order not to add a new one
 * every time the view component re-mounts
 */
const removeAndroidBackButtonHandler = () => {
  BackHandler.removeEventListener('hardwareBackPress', () => {});
}

const goBack = () => {
  if(isReadyRef.current && navigationRef.current) {
    navigationRef.current.goBack();
  } 
}

const exitAlert = () => {
  Alert.alert(
    'Confirmar salida',
    'Quieres salir de la aplicacion?',
    [
      {text: 'Cancelar', style: 'cancel'},
      {text: 'Si', onPress: () => BackHandler.exitApp()}
    ]
  );
};

export {
  handleAndroidBackButton, 
  removeAndroidBackButtonHandler,
};
export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();