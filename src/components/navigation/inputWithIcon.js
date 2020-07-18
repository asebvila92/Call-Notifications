import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';

export default function InputWithIcon(props) {
  const { placeholder, type, iconName, iconType, color, value, onChangeValue, reference } = props
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Icon
          containerStyle={styles.icon}  
          name={iconName} 
          size={24} 
          type={iconType} 
          color={color}
        />
        <TextInput
          ref={reference || null} 
          style={styles.input}
          value={value}
          onChangeText={onChangeValue} 
          keyboardType={type || null} 
          placeholderTextColor={color} 
          placeholder={placeholder} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#efefef',
    borderRadius: 5
  },
  content: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    color: '#4d4f5c',
    fontSize: 18,
  },
  icon: {
    marginRight: 5
  }
})
