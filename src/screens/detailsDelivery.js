import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, ActivityIndicator, Linking, TouchableOpacity, Switch } from 'react-native';
import { Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import InputWithLabel from '../components/navigation/inputWithLabel';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import EditDateTimePicker  from '../components/navigation/editDateTimePicker';
import TextArea from '../components/navigation/textArea';
import MessageResponse from '../components/navigation/messageResponse';
import CustomAlert from '../components/navigation/customAlert';
import Modal from '../components/navigation/modalPhone';
import { invokeUpdateDelivery } from '../redux/actions';
import { CLEAN_FLAGS } from '../redux/constants';
import { validateClientAndDates } from '../helpers/dateHelpers';

export default function DetailsDelivery(props) {
  const { detailsDelivery } = props.route.params
  const [messageInfo, setMessageInfo] = useState(['','']);
  const [isEditable, setIsEditable] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [client, setClient] = useState(detailsDelivery.client);
  const [article, setArticle] = useState(detailsDelivery.article);
  const [price, setPrice] = useState(detailsDelivery.price);
  const [address, setAddress] = useState(detailsDelivery.address);
  const [phone, setPhone] = useState(detailsDelivery.cellphone);
  const [observations, setObservations] = useState(detailsDelivery.observations);
  const userToken = useSelector(store => store.auth.token);
  const userData = useSelector(store => store.auth.userData);
  const wasDeletedDelivery = useSelector(store => store.deliveries.deleted);
  const errorDeleteDelivery = useSelector(store => store.deliveries.errorDelete);
  const isLoading = useSelector(store => store.deliveries.isLoading);
  const isLoadingUpdate = useSelector(store => store.deliveries.isLoadingUpdate);
  const wasUpdateDelivery = useSelector(store => store.deliveries.updated);
  const errorUpdateDelivery = useSelector(store => store.deliveries.errorUpdate);
  const dispatch = useDispatch();

  const [lastDelivery, setLastDelivery] = useState(
    new Date(detailsDelivery.lastDelivery._seconds * 1000));
  const [nextDelivery, setNextDelivery] = useState(
    new Date(detailsDelivery.nextDelivery._seconds * 1000));
  
  useEffect(() => {
    if(wasDeletedDelivery){
      setMessageInfo(['',''])
      props.navigation.goBack()
    }else if(errorDeleteDelivery){
      setMessageInfo(['errDelete', 'No se pudo eliminar, intenta nuevamente'])
    }else if(wasUpdateDelivery){
      setMessageInfo(['updateSuccess', 'Modificacion exitosa'])
    }else if(errorUpdateDelivery){
      setMessageInfo(['errUpdate', 'No se pudo modificar, intenta nuevamente'])
    }
  },[wasDeletedDelivery, errorDeleteDelivery, wasUpdateDelivery, errorUpdateDelivery])

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('blur', () => {
      dispatch({type: CLEAN_FLAGS})
      setMessageInfo(['',''])
    });
    return unsubscribe;
  },[])

  function openPhone(){
    if(phone !== ''){
      setModalVisible(true)
    }else{
      setMessageInfo(['',''])
    }
  }

  function deleteDelivery(){
    CustomAlert(dispatch, userToken, detailsDelivery.id)
  }

  function updateDelivery(){
    const validationDelivery = validateClientAndDates(client, lastDelivery, nextDelivery);

    if(validationDelivery.isValid){
      const dataDelivery = {
        client: client,
        article: article,
        lastDelivery: lastDelivery.setHours(0,0,0,0),
        nextDelivery: nextDelivery.setHours(0,0,0,0),
        cellphone: phone,
        address: address,
        price: price,
        observations: observations,
        savedBy: userData.username
      }
      invokeUpdateDelivery(dispatch, userToken, detailsDelivery.id, dataDelivery)
    }else{
      if(validationDelivery.err === 'dates'){
        setMessageInfo(['dates', validationDelivery.msg]);
      }else{
        setMessageInfo(['client', validationDelivery.msg]);
      }
    }
    
  }  
  
  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps='always'>
      <Modal visible={modalVisible} onChangeVisibility={setModalVisible} phone={phone} />
      <View style={styles.content}>
        <View style={styles.vwSwitch}>
          <Text style={isEditable ? {...styles.txtSwitch, color: 'green'} : styles.txtSwitch}>Editar</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#ffcc4d" }}
            thumbColor={isEditable ? "green" : "#f4f3f4"}
            onValueChange={() => setIsEditable(prevState => !prevState)}
            value={isEditable}
          />
        </View>
        <Text style={styles.txtClient}>{client}</Text>
        <View style={styles.dataDelivery}>
          {messageInfo[0] === 'client' ? <MessageResponse isError={true} message={messageInfo[1]}/> : null}
          <InputWithLabel label='Cliente' editable={isEditable} value={client} onChangeValue={setClient} />
          <InputWithLabel label='Articulo' editable={isEditable} value={article} onChangeValue={setArticle} />
          {messageInfo[0] === 'dates' ? <MessageResponse isError={true} message={messageInfo[1]}/> : null}
          <View style={styles.vwInRow}>
            <EditDateTimePicker label='Ultima Entrega' editable={isEditable} date={lastDelivery} onSelectedDate={setLastDelivery}  />
            <EditDateTimePicker label='Proxima Entrega' editable={isEditable} date={nextDelivery} onSelectedDate={setNextDelivery}  />
          </View>
          <View style={styles.vwInRow}>
            <InputWithLabel label='Precio' editable={isEditable} type='numeric' value={price} onChangeValue={setPrice} />
            <View style={styles.vwPhone}>
              <TouchableOpacity disabled={phone ? false : true}  onPress={openPhone}>
                <Icon containerStyle={styles.iconPhone} name='phone-outgoing' size={20} type='feather' color={phone? 'green' : '#a5a5a5'} reverse />
              </TouchableOpacity>
              <InputWithLabel label='Telefono' editable={isEditable} type='phone-pad' value={phone} onChangeValue={setPhone} />
            </View>
          </View>
          <InputWithLabel label='Direccion' editable={isEditable} value={address} onChangeValue={setAddress} />
          <TextArea
            editable={isEditable}
            value={observations}
            onChangeValue={setObservations}
            title='Observaciones'
            titleColor='#1885f2'
            fontStyle='italic'
            fontSize={18}
          />
        </View>
        {isLoadingUpdate ? <ActivityIndicator size={35} color='#1cacdc'/> : null}
        {messageInfo[0] === 'errUpdate' ? 
          <MessageResponse isError={true} message={messageInfo[1]} /> 
        : messageInfo[0] === 'updateSuccess' ? 
          <MessageResponse isError={false} message={messageInfo[1]} /> 
        : null}
        <ButtonWithGradient text='Guardar Cambios' colorBegin='#1885f2' colorEnd='#1cacdc' disabled={isLoadingUpdate || !isEditable} onPressbtn={updateDelivery} />
        <Text style={styles.savedBy}>{`Ultima modificacion: ${detailsDelivery.savedBy}`}</Text>
      </View>
      {isLoading ? <ActivityIndicator size={35} color='#e73827'/> : null}
      {messageInfo[0] === 'errDelete' ? <MessageResponse isError={true} message={messageInfo[1]} /> : null}
      <ButtonWithGradient text='Borrar' disabled={isLoading} colorBegin='#e73827' colorEnd='#fc6e5b' onPressbtn={deleteDelivery} /> 
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#efefef',
    padding: 20
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 3
  },
  vwSwitch: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 5
  },
  txtSwitch: {
    fontSize: 17,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#4d4f5c',
  },
  txtClient: {
    fontSize: 22,
    letterSpacing: 2,
    marginLeft: 10,
    fontWeight: '700',
    alignSelf: 'center',
    color: '#1885f2',
    marginTop: 10,
    paddingHorizontal: 5
  },
  dataDelivery: {
    paddingHorizontal: 5,
    paddingTop: 10,
    paddingBottom: 0
  },
  vwInRow: {
    flexDirection: 'row',
    justifyContent: "space-between"
  },
  vwPhone: {  
    flexDirection: 'row',
  },
  iconPhone: {
    alignSelf: 'center'
  },
  savedBy: {
    fontSize: 11,
    color: '#4d4f5c',
    alignSelf: 'center'
  }
});