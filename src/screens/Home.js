import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { ListItem, Divider } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import WidgetDashboard from '../components/navigation/widgetDashboard';
import { getDateWithoutTime, formatDate } from '../helpers/dateHelpers';
import ViewIsLoading from '../components/layout/viewIsLoading';
import MessageResponse from '../components/navigation/messageResponse';
import { invokeGetDeliveries } from '../redux/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Home(props) {
  const { navigation } = props;
  const [deliveriesOfToday, setDeliveriesOfToday] = useState([]);
  const userData = useSelector(store => store.auth.userData);
  const userToken = useSelector(store => store.auth.token);
  const deliveries = useSelector(store => store.deliveries.deliveries);
  const isLoading = useSelector(store => store.deliveries.isLoading);
  const dispatch = useDispatch();

  
  useEffect(() => {
    invokeGetDeliveries(dispatch, userToken)
  },[])

  useEffect(() => {
    if(deliveries){
      let deliveriesOfToday = deliveries.filter((log) => {
        return getDateWithoutTime(new Date()).getTime() == getDateWithoutTime(new Date(log.nextDelivery._seconds * 1000)).getTime()
      })
      deliveriesOfToday.sort((first, second) => (
        first.lastDelivery._seconds - second.lastDelivery._seconds
      ))
      setDeliveriesOfToday(deliveriesOfToday)
    }
  }, [deliveries])

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        <Text style={styles.username}>{'Bienvenido '+ userData.name}</Text>, 
        mira las entregas para hoy rapidamente aqui debajo:
      </Text>
      <View style={styles.content}>
        <WidgetDashboard title='Programar Llamado' screenToNavigate='Nueva' navigation={navigation} />
        <WidgetDashboard title='Tabla de Registros' screenToNavigate='Entregas' navigation={navigation} />
        {isLoading ? 
          <View style={{marginTop: 60}}><ViewIsLoading /></View> 
        :
          <View style={styles.contentListOfToday}>
            {
              deliveriesOfToday.length > 0 ? 
                <ScrollView style={styles.listOfToday}>
                {
                  deliveriesOfToday.map((item, i) => {
                    return (
                      <TouchableOpacity key={i} onPress={() => navigation.navigate('Detalles',{detailsDelivery: item})}>
                        <Divider />
                        <ListItem
                          key={i}
                          title={item.client}
                          titleStyle={{fontSize: 14}}
                          subtitle={item.article}
                          subtitleStyle={{fontSize:13}}
                          rightTitle='ultima entrega'
                          rightTitleStyle={{fontSize: 12}}
                          rightSubtitle={formatDate(new Date(item.lastDelivery._seconds * 1000))}
                        />
                      </TouchableOpacity>
                    )
                  })
                }
                </ScrollView>
              :
                <View style={{padding:10}}>
                  <MessageResponse isError={false} message='No hay registros para hoy' />
                </View>  
            }
          </View>
        }
      </View>
    </View>
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
    padding: 20,
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10
  },
  welcome: {
    fontSize: 18,
    fontStyle: 'italic',
    color: '#1885f2',
    marginLeft: 10,
    marginBottom: 15,
  },
  username: {
    fontWeight: 'bold'
  },
  contentListOfToday: {
    flexShrink: 1,
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 0,
    backgroundColor: '#ffff',
    elevation: 4,
  },
});