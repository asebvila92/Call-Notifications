import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { Row, Rows, Table } from 'react-native-table-component'
import { formatDate } from '../helpers/dateHelpers';
import { fetchLogs } from '../helpers/firebaseConsults';

export default function Logs() {
  const [logs, setLogs] = useState();
  const [isLoading, setIsLoading] = useState(true)
  const tableHead = ["cliente", "proxima entrega", "ultima entrega", "articulo"];

  useEffect(() => {
    refreshLogs()
  }, [fetchLogs]);

  function refreshLogs() {
    setIsLoading(true)
    getLogs().then(
      (response) => {
        setLogs(response)
        setIsLoading(false)
        createTable()
      },
      (err) => {
        //console.warn(err)
      }
    )

  }

  function createTable() {
    const arrayLogs = logs.map((log, key) => {
      const nextDelivery = new Date(log.nextDelivery.seconds * 1000)
      const lastDelivery = new Date(log.lastDelivery.seconds * 1000)
      return [log.client, formatDate(nextDelivery), formatDate(lastDelivery), log.article,]
    })
    return arrayLogs
  }

  return (
    <View style={styles.container}>
      <Button title="Recargar" onPress={refreshLogs} />
      {
        isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null
      }
      {logs ?
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
          <Row data={tableHead} style={styles.head} textStyle={styles.text} />
          <Rows data={createTable()} textStyle={styles.text} />
        </Table>
        : null
      }
    </View>
  );
}

function getLogs() {
  return fetchLogs()
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
    backgroundColor: '#f1f8ff'
  },
  text: {
    margin: 6
  }
});

//.where('nextDelivery', '==', 'Hulk')