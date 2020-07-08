import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text} from 'react-native';

export default function ViewIsLoading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={60} color='#1885f2'/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5fa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});