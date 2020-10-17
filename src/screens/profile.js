import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import TextArea from '../components/navigation/textArea';
import Avatar from '../components/navigation/avatar';
import { invokeLogout } from '../redux/actions';

export default function Profile() {
  const [newMessage, setNewMessage] = useState('');
  const userData = useSelector((store) => store.auth.userData);
  const messageForClients = useSelector((store) => store.auth.messageForClients)
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(messageForClients !== ''){
      setNewMessage(messageForClients)
    }
  },[messageForClients])

  function logout() {
    invokeLogout(dispatch)
  }

  function handleUpdateMessage() {
    //update message
  }

  return (
    <ScrollView style={styles.container}>
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
          <Text style={{...styles.fieldUser, marginBottom: 15}}>
            <Text style={styles.label}>Dispositivo: </Text>  
            {userData.deviceId}
          </Text>
          <Text style={styles.label}>Mensaje Automatico:</Text>
          <TextArea
            value={newMessage}
            onChangeValue={setNewMessage}
            title='Escribe aqui...'
            titleColor='#1885f2'
            fontSize={15}
            numberLines={5} 
          />
          <Button 
            buttonStyle={styles.updateMsgBtn}
            titleStyle={styles.txtUpdateBtn}
            title='ACTUALIZAR'
            icon={<Icon name='upload' type='feather' color='#1885f2' />} 
            onPress={handleUpdateMessage} 
          />
        </View>
        <ButtonWithGradient colorBegin='#1885f2' colorEnd='#1cacdc' text='CERRAR SESION' fontSize={14} onPressbtn={logout} /> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#efefef',
  },
  content: {
    padding: 15,
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
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 30
  },
  updateMsgBtn: {
    borderRadius: 20,
    backgroundColor: '#ffff',
    borderWidth: 2,
    borderColor: '#1885f2',
  },
  txtUpdateBtn: {
    color: '#1885f2',
    fontSize: 13,
    marginLeft: 10
  }
});