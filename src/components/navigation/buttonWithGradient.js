import React from 'react';
import { StyleSheet } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';

export default function ButtonWithGradient(props) {
  const { text, onPressbtn, colorBegin, colorEnd, disabled, marginTop, fontSize } = props
  return (
    <GradientButton
      style={{...styles.content, marginTop: marginTop || 10}}
      text={text}
      disabled={disabled || false}
      textStyle={{...styles.txtButton, fontSize: fontSize || 17}}
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
  },
  txtButton: {
    color: 'white',
    fontSize: 12,
    fontWeight: '300'
  }
})  