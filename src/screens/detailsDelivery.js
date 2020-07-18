import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import InputWithLabel from '../components/navigation/inputWithLabel';
import ButtonWithGradient from '../components/navigation/buttonWithGradient';
import EditDateTimePicker  from '../components/navigation/editDateTimePicker';
import TextArea from '../components/navigation/textArea';


export default function DetailsDelivery(props) {
  const { detailsDelivery } = props.route.params
  const [client, setClient] = useState(detailsDelivery.client);
  const [article, setArticle] = useState(detailsDelivery.article);
  const [price, setPrice] = useState(detailsDelivery.price);
  const [address, setAddress] = useState(detailsDelivery.address);
  const [phone, setPhone] = useState(detailsDelivery.cellphone);
  const [observations, setObservations] = useState(detailsDelivery.observations);

  const [lastDelivery, setLastDelivery] = useState(
    new Date(detailsDelivery.lastDelivery._seconds * 1000));
  const [nextDelivery, setNextDelivery] = useState(
    new Date(detailsDelivery.nextDelivery._seconds * 1000));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.vwLock}>
        </View>
        <Text style={styles.txtClient}>{client}</Text>
        <View style={styles.dataDelivery}>
          <InputWithLabel label='Cliente' editable={false} value={client} onChangeValue={setClient} />
          <InputWithLabel label='Articulo' editable={false} value={article} onChangeValue={setArticle} />
          <View style={styles.vwInRow}>
            <EditDateTimePicker label='Proxima Entrega' editable={false} date={nextDelivery} onSelectedDate={setNextDelivery}  />
            <EditDateTimePicker label='Ultima Entrega' editable={false} date={lastDelivery} onSelectedDate={setLastDelivery}  />
          </View>
          <View style={styles.vwInRow}>
            <InputWithLabel label='Precio' editable={false} type='numeric' value={price.toString()} onChangeValue={setPrice} />
            <InputWithLabel label='Telefono' editable={false} type='phone-pad' value={phone} onChangeValue={setPhone} />
          </View>
          <InputWithLabel label='Direccion' editable={false} value={address} onChangeValue={setAddress} />
          <TextArea
            editable={false}
            value={observations}
            onChangeValue={setObservations}
            title='Observaciones'
            titleColor='#1885f2'
            fontStyle='italic'
            fontSize={18}
          />
        </View>
        <ButtonWithGradient text='Guardar Cambios' colorBegin='#1885f2' colorEnd='#1cacdc' disabled={true} />
        <Text style={styles.savedBy}>{`Ultima modificacion: ${detailsDelivery.savedBy}`}</Text>
      </View>
      <ButtonWithGradient text='Borrar' colorBegin='#e73827' colorEnd='#fc6e5b' /> 
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
  },
  vwLock: {
    flexDirection: 'row'
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
  savedBy: {
    fontSize: 11,
    color: '#4d4f5c',
    alignSelf: 'center'
  }
});