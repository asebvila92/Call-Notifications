import React from 'react';
import { Alert } from 'react-native';
import { invokeDeleteDelivery } from '../../redux/actions';

export default function CustomAlert(dispatch, userToken, idDelivery) {
  Alert.alert(
    'Importante',
    'Confirma que desea eliminar este registro ?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: () => {
          invokeDeleteDelivery(dispatch, userToken, idDelivery)
        }
      }
    ]
  )
}