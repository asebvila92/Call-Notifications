import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import TextArea from '../components/navigation/textArea';
import Avatar from '../components/navigation/avatar';
import MessageResponse from '../components/navigation/messageResponse';
import { invokeLogout, invokeChangeMessage } from '../redux/actions';
import { CLEAN_AUTH_FLAGS } from '../redux/constants';

export default function Profile(props) {
  const [newMessage, setNewMessage] = useState('');
  const [messageInfo, setMessageInfo] = useState(['','']);
  const userData = useSelector((store) => store.auth.userData);
  const isLoading = useSelector((store) => store.auth.isLoading);
  const errorChangeMsg = useSelector((store) => store.auth.errorChangeMsg);
  const changeSuccess = useSelector((store) => store.auth.changeSuccess);
  const messageForClients = useSelector((store) => store.auth.messageForClients)
  const userToken = useSelector(store => store.auth.token);
  const dispatch = useDispatch()

  useEffect(() => {
    setNewMessage(messageForClients)
  },[])
  
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      // Screen was left
      setMessageInfo(['',''])
      dispatch({type: CLEAN_AUTH_FLAGS})
    });
    return unsubscribe;
  },[])

  useEffect(() => {
    if(errorChangeMsg){
      setMessageInfo(['errChange', true, 'No se pudo actualizar intenta nuevamente']);
    }else if(changeSuccess) {
      setMessageInfo(['successChange', false, 'Modificacion exitosa']);
    }
  },[errorChangeMsg, changeSuccess])


  function logout() {
    invokeLogout(dispatch);
  }

  function handleUpdateMessage() {
    setMessageInfo(['', null, '']);
    if(newMessage !== '' && newMessage.trim() !== '') {
      Alert.alert(
        'Modificacion',
        'Confirma que desea cambiar el mensaje por el ingresado?',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Aceptar',
            onPress: () => {
              invokeChangeMessage(dispatch, userToken, {id:'default', message: newMessage})
            }
          }
        ]
      )
    }else{
      setMessageInfo(['infoUpdate', true, 'El mensaje debe tener contenido'])
    }
  }
  
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
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
          {messageInfo[0] !== '' ? <MessageResponse isError={messageInfo[1]} message={messageInfo[2]}/> : null}
          <Button
            loading={isLoading}
            disabled={isLoading}
            disabledStyle={{borderColor: '#efefef'}}
            loadingProps={{color: '#1885f2', size: 23}}
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