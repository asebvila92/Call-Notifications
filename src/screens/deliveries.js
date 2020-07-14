import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { useSelector, useDispatch } from 'react-redux';
import { invokeGetDeliveries } from '../redux/actions'
import { formatDate } from '../helpers/dateHelpers';

export default function Deliveries() {
  const userToken = useSelector(store => store.auth.token);
  const deliveries = useSelector(store => store.deliveries.deliveries);
  const isLoading = useSelector(store => store.deliveries.isLoading)
  const tableHead = ["cliente", "proxima entrega", "ultima entrega", "articulo"];
  
  const dispatch = useDispatch();

  useEffect(() => {
    invokeGetDeliveries(dispatch, userToken)
  }, [])

  function createTable() {
    const deliveriesTable = deliveries.map((log, key) => {
      const nextDelivery = new Date(log.nextDelivery._seconds * 1000)
      const lastDelivery = new Date(log.lastDelivery._seconds * 1000)
      return [
        <TouchableOpacity style={styles.button}>
          <Text>{log.client}</Text>
        </TouchableOpacity>,
        formatDate(nextDelivery),
        formatDate(lastDelivery),
        log.article
      ]
    })

    return deliveriesTable
  }

  function refreshLogs(){
    console.warn('refresh logs')
  }

  return (
    <View style={styles.container}>
      <Button title="Recargar" onPress={refreshLogs} />
      <Text style={styles.text}>Precione el nombre del cliente para elimiar el registro</Text>
      {
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
      <View style={styles.logView}>
        <Table>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
        </Table>
        <ScrollView>
          <Table borderStyle={{ /*borderWidth: 2,*/ borderColor: 'transparent' }}>
            <Rows data={createTable()} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  head: {
    height: 40,
    backgroundColor: '#b2cbe3'
  },
  text: {
    margin: 6
  },
  button: {
    backgroundColor: "#2196f3",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 2
  },
  logView: {
    marginBottom: 119
  }
});