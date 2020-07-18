import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';


export default function InputWithLabel(props) {
  const { label, type, value, onChangeValue } = props
  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        style={styles.field} 
        keyboardType={type === 'date' ? 'default' : type} 
        value={value}
        editable={type === 'date' ? false : true} 
        onChangeText={(text) => onChangeValue(text)} 
      />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  label:{
    fontSize: 14,
    color: '#c6c6c6',
    fontStyle: 'italic'
  },
  field: {
    fontSize: 18,
    color: '#4d4f5c',
    fontStyle: 'italic'
  }
});