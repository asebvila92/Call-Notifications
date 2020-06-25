import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyTabBar({ state, descriptors, navigation }) {
  const [isVisible, setIsVisible] = useState(true)

  function keyboardWillShow(event) {
    setIsVisible(false)
  }

  function keyboardWillHide(event) {
    setIsVisible(true)
  }

  useEffect(() => {
    //DidMount
    Keyboard.addListener('keyboardDidShow', keyboardWillShow)
    Keyboard.addListener('keyboardDidHide', keyboardWillHide)
    return(
      () => {
        // WillUnmount
        Keyboard.removeListener('keyboardDidShow', keyboardWillShow)
        Keyboard.removeListener('keyboardDidHide', keyboardWillHide)
      }
    )
  }, [])


  return (
    isVisible ? 
      <SafeAreaView style={{backgroundColor: '#1885f2'}}>
        <LinearGradient
          colors={['#1885f2', '#2b8ff3', '#1cacdc']}
        > 
          <View style={styles.container}>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label = options.title
              const isFocused = state.index === index;
              
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              return (
                <TouchableOpacity
                  key={index}
                  accessibilityRole="button"
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={isFocused ? styles.touchItemFocus : styles.touchItem}
                >
                  <View style={isFocused ? styles.itemImageFocus : null}>
                  {
                    options.tabBarIcon({isFocused})
                  }
                  </View>
                  <Text style={styles.itemLabel}>
                    {label}
                  </Text> 
                </TouchableOpacity> 
              );
            })}
          </View>
        </LinearGradient>
      </SafeAreaView>
    :
    <View></View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingTop: 5,
    alignItems: 'flex-end'
  },
  touchItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchItemFocus: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemImageFocus: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 30,
  },
  itemLabel: {
    marginTop: 3,
    fontSize: 12,
    color: '#ffff',
    alignSelf: 'center'
  },
});