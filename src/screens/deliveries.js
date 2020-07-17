import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import ViewIsLoading from '../components/layout/viewIsLoading';
import { invokeGetDeliveries } from '../redux/actions'
import { formatDate } from '../helpers/dateHelpers';

export default function Deliveries() {
  const userToken = useSelector(store => store.auth.token);
  const deliveries = useSelector(store => store.deliveries.deliveries);
  const isLoading = useSelector(store => store.deliveries.isLoading)
  const tableHead = ["Cliente", "Proxima entrega", "Ultima entrega", "Articulo"];
  
  const dispatch = useDispatch();

  useEffect(() => {
    invokeGetDeliveries(dispatch, userToken)
  }, [])

  function createlogs() {
    let arrayLogs = [];
    for(let i = 0 ; i < 50 ; i++){
      arrayLogs.push({
        client: "alguiennnnnnnnnn",
        nextDelivery: "19/07/20",
        lastDelivery: "19/07/20",
        article: "Nutra nuggets verde 15kg"
      })
    }
    return arrayLogs;
  }

  function createTable() {
    //const arrayLogs = createlogs();
    const deliveriesTable = deliveries.map((log, key) => {
      const nextDelivery = new Date(log.nextDelivery._seconds * 1000)
      const lastDelivery = new Date(log.lastDelivery._seconds * 1000)
      return [
        <Text style={styles.cellClient} numberOfLines={1}>{log.client}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{formatDate(nextDelivery)}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{formatDate(lastDelivery)}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{log.article}</Text>
      ]
    })

    return deliveriesTable
  }

  function handleRefresh(){
    invokeGetDeliveries(dispatch, userToken)
  }

  return (
    <View style={styles.container}>
      <View style={styles.logView} >
        <LinearGradient style={styles.headRow} colors={['#2b8ff3', '#1cacdc']}> 
          <Table>
            <Row opacityPress={1} data={tableHead} textStyle={styles.headText} />
          </Table>
        </LinearGradient>
        {
          deliveries ?
            <ScrollView refreshControl={
              <RefreshControl 
              refreshing={isLoading} 
              colors={['#1885f2', '#2b8ff3', '#1cacdc']}
              size='large'
              onRefresh={handleRefresh} 
              />}
            >
              <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                {
                  createTable().map((row, key) => (
                    <Row key={key} data={row} onRowPress={() => console.warn('eeee')} />
                    ))
                }
              </Table>
            </ScrollView>
          :
            <View style={styles.containerLoader}>
              <ViewIsLoading />
            </View>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
  },
  logView: {
    marginBottom: 98
  },
  headRow: {
    height: 55,
    marginTop: 40,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headText: {
    marginBottom: 6,
    textAlign: 'center',
    fontSize: 16,
    color: '#FFCC3D',
    fontWeight: 'bold'
  },
  cell: {
    marginHorizontal: 3,
    marginVertical: 3
  },
  cellClient: {
    marginHorizontal: 3,
    marginVertical: 8,
    color: '#1885f2',
    fontWeight: 'bold'
  },
  containerLoader: {
    paddingTop: 50
  }
});