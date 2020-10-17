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
  const [searchedLog, setSearchedLog] = useState('');
  const [filteredDeliveries, setFilteredDeliveries] = useState()
  const userToken = useSelector(store => store.auth.token);
  const deliveries = useSelector(store => store.deliveries.deliveries);
  const isLoading = useSelector(store => store.deliveries.isLoading)
  const tableHead = ["Cliente", "Prox", "Ultima", "Articulo"];
  const dispatch = useDispatch();

  useEffect(() => {
    invokeGetDeliveries(dispatch, userToken)
  }, [])

  useEffect(() => {
    if(deliveries && deliveries.length > 0){
      setSearchedLog('');
      setFilteredDeliveries(deliveries)
    }
  }, [deliveries])

  function viewDetails(detailsDelivery) {
    props.navigation.navigate('Detalles', {
      detailsDelivery: detailsDelivery
    })
  }

  function findALogByClient(wordInput) {
    setSearchedLog(wordInput);
    let filteredDeliveries = deliveries.filter((del) => (del.client.toLowerCase().indexOf(wordInput.toLowerCase()) >= 0));
    setFilteredDeliveries(filteredDeliveries);
  }

  function createTable() {
    const deliveriesTable = filteredDeliveries.map((log) => {
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
    setSearchedLog('');
    invokeGetDeliveries(dispatch, userToken)
  }

  return (
    <View style={styles.container}>
      <View style={styles.logView} >
      <SearchBar 
        platform='android' 
        placeholder="Buscar..."
        round={true}
        value={searchedLog}
        inputContainerStyle={styles.searchBarDelivery}
        placeholderTextColor='#a5a5a5'
        onChangeText={(text) => findALogByClient(text)} 
      />
        <LinearGradient style={styles.headRow} colors={['#2b8ff3', '#1cacdc']}> 
          <Table>
            <Row opacityPress={1} flexArr={[2,1.25,1.25,2]} data={tableHead} textStyle={styles.headText} />
          </Table>
        </LinearGradient>
        {
          filteredDeliveries ?
            <ScrollView refreshControl={
              <RefreshControl 
              refreshing={isLoading} 
              colors={['#1885f2', '#2b8ff3', '#1cacdc']}
              size='large'
              onRefresh={handleRefresh} 
              />}
            >
              <Table style={{minHeight:30}} borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
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
    marginBottom: 120,
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
  },
  searchBarDelivery: {
    backgroundColor: '#e9e9e9',
    borderRadius: 10,
  }
});