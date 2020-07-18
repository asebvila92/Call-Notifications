import React  from 'react';
import { Avatar } from 'react-native-elements'

export default function MyAvatar(props){
  const { size, userData, navigation } = props

  function getLastLetters(){
    return userData.name[0] + userData.lastname[0]
  }

  if(navigation){
    return (
      <Avatar
        containerStyle={{backgroundColor: '#ffb600'}}
        size={size} 
        rounded 
        title={getLastLetters()}
        onPress={() => navigation.navigate('Perfil')}
      />
    )
  }else { 
    return (
      <Avatar
        containerStyle={{backgroundColor: '#ffb600'}} 
        size={size} 
        rounded 
        title={getLastLetters()}
      />
    )
  }



}