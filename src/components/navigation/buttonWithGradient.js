import React from 'react';
import { StyleSheet } from 'react-native';
import GradientButton from 'react-native-gradient-buttons';

export default function ButtonWithGradient(props) {
  const { text, onPressbtn } = props
  return (
    <GradientButton
      style={styles.content}
      text={text}
      //disabled={}
      textStyle={styles.txtButton}
      gradientBegin='#1885f2'
      gradientEnd='#1cacdc'
      gradientDirecction='horizontal'
      radius={23}
      onPressAction={onPressbtn}/>
  )
}


const styles = StyleSheet.create({
  content: {
    maxHeight: 45,
    marginTop: 20
  },
  txtButton: {
    color: 'white',
    fontSize: 17,
    fontWeight: '300'
  }
})  