import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import InputWithIcon from '../components/navigation/inputWithIcon';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import DateTimePicker from '../components/navigation/DateTimePicker';
import TextArea from '../components/navigation/textArea';
import MessageResponse from '../components/navigation/messageResponse';
import { invokeAddDelivery } from '../redux/actions';
import { CLEAN_FLAGS } from '../redux/constants';
import { validateClientAndDates } from '../helpers/dateHelpers'; 

export default function NewDelivery(props) {
  const [nextDelivery, setNextDelivery] = useState(
    new Date(new Date().getYear() + 1900, new Date().getMonth() + 1, new Date().getDate(),)
  );
  const [lastDelivery, setLastDelivery] = useState(
    new Date(new Date().getYear() + 1900, new Date().getMonth(), new Date().getDate(),)
  );
  const [client, setClient] = useState('');
  const [article, setArticle] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [observations, setObservations] = useState('');
  const [messageInfo, setMessageInfo] = useState(['','']);
  const userData = useSelector(store => store.auth.userData);
  const userToken = useSelector(store => store.auth.token);
  const isLoading = useSelector(store => store.deliveries.isLoading);
  const errorAdd = useSelector(store => store.deliveries.errorAddDelivery);
  const lastAdded = useSelector(store => store.deliveries.lastAdded);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(errorAdd){
      setMessageInfo(['errAdd', 'Ocurrio un error, intente nuevamente'])
    }else if(lastAdded !== ''){
      setMessageInfo(['success', 'Entrega agregada exitosamente'])
    }
  },[errorAdd, lastAdded])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      // Screen was left
      setMessageInfo(['',''])
      dispatch({type: CLEAN_FLAGS})
    });
    return unsubscribe;
  },[])

  function saveDelivery() {
    const validationDelivery = validateClientAndDates(client, lastDelivery, nextDelivery);
  
    if(validationDelivery.isValid){
      const newDelivery = {
        client: client,
        article: article,
        lastDelivery: lastDelivery.setHours(0,0,0,0),
        nextDelivery: nextDelivery.setHours(0,0,0,0),
        cellphone: phone,
        price: price,
        address: address,
        observations: observations,
        user: userData.username
      }
      invokeAddDelivery(dispatch, userToken, newDelivery);
      setMessageInfo(['','']);
      resetInputs();
    }else{
      if(validationDelivery.err === 'dates'){
        setMessageInfo(['dates', validationDelivery.msg]);
      }else{
        setMessageInfo(['client', validationDelivery.msg]);
      }
    }
  }

  function resetInputs() {
    setArticle('')
    setClient('')
    setPrice('')
    setAddress('')
    setPhone('')
    setObservations('')
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
      <View style={styles.content}>
        {messageInfo[0] === 'client' ? <MessageResponse isError={true} message={messageInfo[1]}/> : null}
        <InputWithIcon value={client} onChangeValue={setClient} placeholder='Cliente' iconType='font-awesome' iconName='user' color='#1885f2' />
        <InputWithIcon value={article} onChangeValue={setArticle} placeholder='Articulo' iconType='font-awesome' iconName='shopping-cart' color='#1885f2'/>
        {messageInfo[0] === 'dates' ? <MessageResponse isError={true} message={messageInfo[1]}/> : null}
        <View style={styles.vwInRow}>
          <DateTimePicker legend='Ultima entrega' iconColor='green' date={lastDelivery} onSelectedDate={setLastDelivery} />
          <DateTimePicker legend='Proxima entrega' iconColor='red' date={nextDelivery} onSelectedDate={setNextDelivery} />
        </View>
        <View style={styles.vwInRow}>
          <InputWithIcon value={price} onChangeValue={setPrice} placeholder='Precio' type='numeric' iconType='font-awesome' iconName='money' color='#1885f2'/>
          <InputWithIcon value={phone} onChangeValue={setPhone} placeholder='Telefono' type='phone-pad' iconType='font-awesome' iconName='phone' color='#1885f2'/>
        </View>
        <InputWithIcon value={address} onChangeValue={setAddress} placeholder='Direccion' iconType='fontisto' iconName='home' color='#1885f2'/>
        <View style={styles.vwTextArea}>
        <TextArea 
            value={observations}
            onChangeValue={setObservations}
            title='Observaciones'
            titleColor='#1885f2'
            fontSize={18}
          />
        </View>
        {isLoading ? <ActivityIndicator size={30} color="#1cacdc" /> : null}
        {messageInfo[0] === 'errAdd' ? 
          <MessageResponse isError={true} message={messageInfo[1]} /> 
        : messageInfo[0] === 'success' ? 
          <MessageResponse isError={false} message={messageInfo[1]} /> 
        : null}
        <ButtonWithGradient text='GUARDAR' colorBegin='#1885f2' colorEnd='#1cacdc' disabled={isLoading} onPressbtn={saveDelivery} /> 
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
    paddingTop: 20,
    padding: 5,
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  vwInRow:{
    flexDirection: 'row',
    justifyContent: "space-between"
  },
});