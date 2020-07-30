import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import Avatar from '../components/navigation/avatar';
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
          <Text style={styles.txtName}>{userData.name + ' ' + userData.lastname}</Text>
        </View>
        <View style={styles.vwUserData}>
          <Text style={styles.fieldUser}>
            <Text style={styles.label}>Usuario: </Text>  
            {userData.username}
          </Text>
          <Text style={styles.fieldUser}>
            <Text style={styles.label}>Dispositivo: </Text>  
            {userData.deviceId}
          </Text>
        </View>
        
        <ButtonWithGradient colorBegin='#1885f2' colorEnd='#1cacdc' text='Cerrar Sesion' onPressbtn={logout} /> 
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
  txtName: {
    fontSize: 32,
    letterSpacing: 1
  },
  label: {
    fontSize: 14,
    color: '#9a9a9a',
  },
  fieldUser: {
    fontSize: 17,
    color: '#4d4f5c',
  },
  vwUserData: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 30
  }
});