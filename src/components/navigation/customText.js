import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-elements';


export default function CustomText(props) {
  const { label, value } = props
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.userField}>{value}</Text>
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
  },
  userField: {
    fontSize: 18,
    color: '#4d4f5c'
  }
});