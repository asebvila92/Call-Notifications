import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Divider } from 'react-native-elements';


export default function DetailsDelivery(props) {
  const { detailsDelivery } = props.route.params
  console.log(detailsDelivery);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>details</Text>
      <Text style={styles.userField}>detalle</Text>
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
  userField: {
    fontSize: 18,
    color: '#4d4f5c',
    fontStyle: 'italic'
  }
});