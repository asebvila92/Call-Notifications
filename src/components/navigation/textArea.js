import React from 'react';
import { StyleSheet, TextInput } from 'react-native';


export default function TextArea(props) {
  const { value, onChangeValue, editable, title, titleColor, fontSize, fontStyle } = props
  
  return (
    <TextInput
      value={value}
      editable={editable}
      onChangeText={onChangeValue} 
      style={{...styles.styles, fontSize: fontSize, fontStyle: fontStyle}}
      placeholder={title}
      placeholderTextColor={titleColor}
      numberOfLines={2} 
      multiline={true} 
    />
  );
}

const styles = StyleSheet.create({
  styles: {
    color: '#4d4f5c',
    textAlignVertical: 'top',
    backgroundColor: '#efefef',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 10
  }
});