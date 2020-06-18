import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component';
import { formatDate } from '../helpers/dateHelpers';

export default function Deliveries() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const tableHead = ["cliente", "proxima entrega", "ultima entrega", "articulo"];

  function createTable() {
    const arrayLogs = logs.map((log, key) => {
      const nextDelivery = new Date(log.nextDelivery.seconds * 1000)
      const lastDelivery = new Date(log.lastDelivery.seconds * 1000)
      return [
        <TouchableOpacity style={styles.button} onPress={() => handleDeleteNotification(log.id, log.notificationId, log.client)}>
          <Text>{log.client}</Text>
        </TouchableOpacity>,
        formatDate(nextDelivery),
        formatDate(lastDelivery),
        log.article
      ]
    })

    return arrayLogs
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
      {logs ?
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
        : null
      }
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