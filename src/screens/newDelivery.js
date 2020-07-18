import React, { useState, useRef } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Alert } from 'react-native';
import InputWithIcon from '../components/navigation/inputWithIcon';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import DateTimePicker from '../components/navigation/DateTimePicker';
import TextArea from '../components/navigation/textArea';

export default function NewDelivery() {
  const [nextDelivery, setNextDelivery] = useState(
    new Date(
      new Date().getYear() + 1900,
      new Date().getMonth() + 1,
      new Date().getDate(),
    ),
  );
  const [lastDelivery, setLastDelivery] = useState(
    new Date(
      new Date().getYear() + 1900,
      new Date().getMonth(),
      new Date().getDate(),
    ),
  );
  const [client, setClient] = useState('');
  const [article, setArticle] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [observations, setObservations] = useState('');
  const inputClient = useRef(null);

  function saveDelivery() {
    Alert.alert('',`${client}\n${article}\n${price}\nproxima: ${nextDelivery}\nultima: ${lastDelivery}\n${address}\n${phone}\n${observations}`);
    //resetInputs();
  }

  function resetInputs() {
    setArticle('')
    setClient('')
    setPrice('')
    setAddress('')
    setPhone('')
    setObservations('')
    inputClient.current.focus();
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <InputWithIcon value={client} onChangeValue={setClient} placeholder='Cliente' iconType='font-awesome' iconName='user' color='#1885f2' reference={inputClient} />
        <InputWithIcon value={article} onChangeValue={setArticle} placeholder='Articulo' iconType='font-awesome' iconName='shopping-cart' color='#1885f2'/>
        <DateTimePicker legend='Proxima entrega' iconColor='red' date={nextDelivery} onSelectedDate={setNextDelivery} />
        <DateTimePicker legend='Ultima entrega' iconColor='green' date={lastDelivery} onSelectedDate={setLastDelivery} />
        <InputWithIcon value={price} onChangeValue={setPrice} placeholder='Precio' type='numeric' iconType='font-awesome' iconName='money' color='#1885f2'/>
        <InputWithIcon value={address} onChangeValue={setAddress} placeholder='Direccion' iconType='fontisto' iconName='home' color='#1885f2'/>
        <InputWithIcon value={phone} onChangeValue={setPhone} placeholder='Telefono' type='phone-pad' iconType='font-awesome' iconName='phone' color='#1885f2'/>
        <View style={styles.vwTextArea}>
        <TextArea 
            value={observations}
            onChangeValue={setObservations}
            title='Observaciones'
            titleColor='#1885f2'
            fontSize={18}
          />
        </View>
        <ButtonWithGradient text='GUARDAR' colorBegin='#1885f2' colorEnd='#1cacdc' onPressbtn={saveDelivery} /> 
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
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  textArea: {
    fontSize: 18,
    textAlignVertical: 'top',
    backgroundColor: '#efefef',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  },
});