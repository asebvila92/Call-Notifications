import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Platform } from 'react-native'
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-navigation';
import { Header } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Avatar from '../navigation/avatar';


export default function HeaderApp(props) {
  const userData = useSelector((store) => store.auth.userData);
  const { navigation, title } = props
  
  return(
    <SafeAreaView forceInset={{ bottom: 'never', top: Constants.statusBarHeight}} style={{backgroundColor: '#1885F2'}}>
      <LinearGradient colors={['#1885f2', '#2b8ff3', '#1cacdc']}>
        <Header
          backgroundColor='transparent'
          containerStyle={Platform.OS === 'android' ? styles.headerStylesAndroid : styles.headerStylesIos}
          leftComponent={
            () => 
              title !== 'Home' ? 
                <TouchableOpacity style={styles.touchBack} onPress={() => navigation.canGoBack() ? navigation.goBack() : null}>
                  <FontAwesome
                    name='angle-left'
                    size={34}
                    color='#ffff'
                  />
                </TouchableOpacity> 
              :
                null  
          }
          centerComponent={<Text style={styles.headerTitle}>{title}</Text>}
          rightComponent={
            () => 
              title !== 'Perfil' ? 
                <Avatar size='medium' userData={userData} navigation={navigation} />  
              : null
          }
        />
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerStylesAndroid: {
    height: 70,
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 30,
    borderBottomColor: '#96E4FF'
  },
  headerStylesIos: {
    height: 80,
    paddingLeft: 0,
    paddingRight: 20,
    borderBottomColor: '#96E4FF'
  },
  touchBack: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600'
  }
})