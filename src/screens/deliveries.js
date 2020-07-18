import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Row, Table } from 'react-native-table-component';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import ViewIsLoading from '../components/layout/viewIsLoading';
import { invokeGetDeliveries } from '../redux/actions'
import { formatDate } from '../helpers/dateHelpers';

export default function Deliveries(props) {
  const [search, setSearch] = useState('');
  const userToken = useSelector(store => store.auth.token);
  const deliveries = useSelector(store => store.deliveries.deliveries);
  const isLoading = useSelector(store => store.deliveries.isLoading)
  const tableHead = ["Cliente", "Proxima entrega", "Ultima entrega", "Articulo"];
  const dispatch = useDispatch();

  useEffect(() => {
    invokeGetDeliveries(dispatch, userToken)
  }, [])

  function viewDetails(detailsDelivery) {
    props.navigation.navigate('Detalles', {
      detailsDelivery: detailsDelivery
    })
  }

  function createTable() {
    const deliveriesTable = deliveries.map((log) => {
      const nextDelivery = new Date(log.nextDelivery._seconds * 1000);
      const lastDelivery = new Date(log.lastDelivery._seconds * 1000);
      const row = [
        <Text style={styles.cellClient} numberOfLines={1}>{log.client}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{formatDate(nextDelivery)}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{formatDate(lastDelivery)}</Text>,
        <Text style={styles.cell} numberOfLines={1}>{log.article}</Text>
      ]
      let delivery = {};
      delivery.row = row;
      delivery.data = log;
      return(
        delivery
      )
    })
    return deliveriesTable
  }

  function handleRefresh(){
    invokeGetDeliveries(dispatch, userToken)
  }

  return (
    <View style={styles.container}>
      <View style={styles.logView} >
      <SearchBar 
        platform='ios' 
        placeholder="Buscar..."
        round={true}
        value={search}
        onChangeText={(text) => setSearch(text)} 
      />
        <LinearGradient style={styles.headRow} colors={['#2b8ff3', '#1cacdc']}> 
          <Table>
            <Row opacityPress={1} flexArr={[2,1.25,1.25,2]} data={tableHead} textStyle={styles.headText} />
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
                  createTable().map((delivery, key) => (
                    <Row key={key} data={delivery.row} flexArr={[2,1.25,1.25,2]} onRowPress={() => viewDetails(delivery.data)} />
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
    marginBottom: 132,
  },
  headRow: {
    height: 55,
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
    color: '#4d4f5c',
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