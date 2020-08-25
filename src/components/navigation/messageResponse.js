import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';

export default function MessageResponse(props) {
  const { isError, message, colorText } = props
  
  let color =  colorText ? colorText : null
  if(color === null){
    color =  isError ? 'red' : 'green'
  }

  return (
    <View style={styles.vwMsg}>
      <Icon
        name={isError ? 'circle-with-cross' : 'check-circle'}
        size={16}
        type={isError ? 'entypo' : 'font-awesome'}
        color={color}
      />
      <Text style={{...styles.txtMsg, color: color}}>{message}</Text>
    </View>
  ) 
}

const styles = StyleSheet.create({
  vwMsg: {
    flexDirection: 'row', 
    alignItems: 'center', 
    alignSelf: 'center'
  },
  txtMsg: {
    color: 'red', 
    fontSize: 13, 
    marginLeft: 3
  }
});