import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function Login(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesion</Text>
        <TextInput 
          style={styles.txtInput} 
          placeholder="Usuario" 
          placeholderTextColor="#ececec"
          value={username} 
          onChangeText={setUsername}/>
        <TextInput 
          style={styles.txtInput} 
          placeholder="Constraseña" 
          placeholderTextColor="#ececec"
          secureTextEntry={true} 
          value={password}
          onChangeText={setPassword}/>
        {
          //<ActivityIndicator style={styles.loader} size="large" color="#ffff" /> 
        }
        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.txtLogin}>Entrar</Text>
        </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1885f2',
    justifyContent: 'center'
  },
  title:{
    fontSize: 40,
    color: '#f5f5f5',
    marginBottom: 30,
  },
  txtInput: {
    color: '#ffff',
    fontSize: 18,
    maxHeight: 70,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#ececec',
    padding: 15
  },
  loader: {
    marginBottom: 10
  },
  btnLogin: {
    borderWidth: 1.5,
    borderColor: 'white',
    borderRadius: 30,
    padding: 15,
    maxHeight: 50,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 20,
    color:'#fff',
    fontWeight: '600'
  },
});