import React from 'react';
import { StyleSheet, View, ScrollView, } from 'react-native';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <ButtonWithGradient text='Salir' /> 
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  content: {
    padding: 20,
    flex: 1,
  },
});