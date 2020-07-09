import React  from 'react';
import { Avatar } from 'react-native-elements'

export default function MyAvatar(props){
  const { size, userData, navigation } = props
  if(navigation){
    return (
      <Avatar
        containerStyle={{backgroundColor: '#a9a9a9'}}
        size={size} 
        rounded 
        title={userData}
        onPress={() => navigation.navigate('Perfil')}
      />
    )
  }else { 
    return (
      <Avatar 
        size={size} 
        rounded 
        title={userData}
      />
    )
  }



}