import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import MessageResponse from '../components/navigation/messageResponse';
import { invokeLogin } from '../redux/actions/auth';

export default function Login(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [messageInfo, setMessageInfo] = useState(['','']);
  const isLoading = useSelector((store) => store.auth.isLoading);
  const errorAuth = useSelector((store) => store.auth.errorAuth);
  const userData = useSelector(store => store.auth.userData);
  const dispatch = useDispatch();

  function handleLogin(){
    setMessageInfo(['', ''])
    if(username !== '' && password !== ''){
      invokeLogin(dispatch, username, password)
    }else{
      setMessageInfo(['errAuth', 'Ambos campos son requeridos'])
    }
  }

  useEffect(() => {
    if(errorAuth){
      setMessageInfo(['errLogin', 'Error de conexion, intente de nuevo'])
    }
  },[errorAuth])

  return (
    <LinearGradient
      colors={['#1885f2', '#2b8ff3', '#1cacdc']}
      style={styles.container}
    > 
      <View style={styles.vwInput}>
        <Input
          label='Usuario'
          placeholder='Tu nombre'
          leftIcon={<Icon type='font-awesome' name='user' size={30} color='black'/>}
          style={styles.input}
          value={username} 
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.vwInput}>
        <Input
          label='Contraseña'
          placeholder='************'
          leftIcon={<Icon type='font-awesome' name='lock' size={30} color='black'/>}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
        {
          isLoading ? <ActivityIndicator style={styles.loader} color='#ffff' size="large"  /> : null
        }
        {
          messageInfo[0] !== '' ? <MessageResponse isError={true} colorText="#ffff" message={messageInfo[1]} /> : null
        }
        <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
          <Text style={styles.txtLogin}>Entrar</Text>
        </TouchableOpacity>

    </LinearGradient>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  vwInput: {
    backgroundColor: '#ffff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: 10,
  },
  loader: {
    marginBottom: 10
  },
  txtError: {
    color: 'white',
    marginBottom: 10,
    alignSelf: 'center'
  },
  btnLogin: {
    backgroundColor: '#ffcc4d',
    borderRadius: 10,
    padding: 15,
    maxHeight: 80,
    marginBottom: 20,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 20,
    color:'#fff',
    fontWeight: 'bold'
  },
});