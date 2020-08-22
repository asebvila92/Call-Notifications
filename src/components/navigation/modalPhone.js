import React from 'react';
import { StyleSheet, Text, Linking, View,TouchableOpacity } from 'react-native';
import { Overlay, Icon} from 'react-native-elements';


export default function ModalPhone(props) {
  const { visible, onChangeVisibility, phone } = props

  const selectResource = (resourse) => {
    switch(resourse){
      case 'phone': 
        Linking.openURL(`tel:${phone}`);
        break;
      case 'whatsapp':
        Linking.openURL(`whatsapp://send?text=hello&phone=+598${phone.replace('0','')}`);
        break;
      case 'sms':
        Linking.openURL(`sms://${phone}?body=hello`);
        break;  
      default:
        return    
    }
  }

  function isCellphone(){
    return phone && phone.startsWith('09')
  }

  return (
    <Overlay isVisible={visible} onBackdropPress={() => onChangeVisibility(false)}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Completar via</Text>
        <View style={styles.container}>
          <View style={styles.vwModalOption}>
            <Icon 
              containerStyle={styles.iconPhone} 
              name='whatsapp' size={22} 
              Component={TouchableOpacity} 
              disabled={!isCellphone()}
              type='fontisto' 
              color='#25d366' reverse 
              onPress={() => selectResource('whatsapp')} 
            />
            <Text>Whatsapp</Text>
          </View>
          <View style={styles.vwModalOption} >
            <Icon 
              containerStyle={styles.iconPhone} 
              name='phone' size={22} 
              Component={TouchableOpacity}
              type='feather' 
              color='#325bc9' reverse
              onPress={() => selectResource('phone')}  
            />
            <Text>Telefono</Text>
          </View>
          <View style={styles.vwModalOption} >
            <Icon 
              containerStyle={styles.iconPhone} 
              name='message' size={22} 
              Component={TouchableOpacity}
              disabled={!isCellphone()}
              type='material-icons' 
              color='#1a72e8' reverse 
              onPress={() => selectResource('sms')} 
            />
            <Text>SMS</Text>
          </View>
        </View>
      </View>
    </Overlay>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 25,
    flexDirection: 'row',
  },
  title: {
    fontSize: 17,
    fontWeight: '700'
  },
  vwModalOption: {
    alignItems: 'center',
    marginRight: 15,
    marginLeft: 15
  }
});