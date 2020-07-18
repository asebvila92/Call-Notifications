import React from 'react';
import { StyleSheet } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';

export default function ButtonWithGradient(props) {
  const { text, onPressbtn, colorBegin, colorEnd, disabled } = props
  return (
    <GradientButton
      style={styles.content}
      text={text}
      disabled={disabled || false}
      textStyle={styles.txtButton}
      gradientBegin={colorBegin}
      gradientEnd={colorEnd}
      gradientDirecction='horizontal'
      radius={23}
      onPressAction={onPressbtn}/>
  )
}


const styles = StyleSheet.create({
  content: {
    maxHeight: 45,
    marginTop: 10
  },
  txtButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '300'
  }
})  