import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import Avatar from '../components/navigation/avatar';
import CustomText from '../components/navigation/customText';
import { invokeLogout } from '../redux/actions';

export default function Profile() {
  const userData = useSelector((store) => store.auth.userData);
  const dispatch = useDispatch()

  function logout() {
    invokeLogout(dispatch)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.vwAvatar}>
          <Avatar userData={userData} size='xlarge' />
        </View>
        <View style={styles.vwUserData}>
          <Text style={styles.txtTitle}>Informacion Personal</Text>
          <CustomText label='Nombre' value={userData.name + ' ' + userData.lastname} />
          <CustomText label='Usuario' value={userData.username} />
          <CustomText label='Dispositivo' value={userData.deviceId} />
        </View>
        
        <ButtonWithGradient text='Cerrar Sesion' onPressbtn={logout} /> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#efefef',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  vwAvatar: {
    alignItems: 'center',
    marginBottom: 20
  },
  vwUserData: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30
  },
  txtTitle: {
    fontSize: 19,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#1885f2',
    marginVertical: 5,
    marginBottom: 10
  },
});