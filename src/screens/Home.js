import React from 'react';
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import WidgetDashboard from '../components/navigation/widgetDashboard';
import { ListItem, Divider } from 'react-native-elements';
import { invokeLogout } from '../redux/actions';

export default function Home(props) {
  const { navigation } = props;
  const dispatch = useDispatch()
  //mook list
  const list = [
    {
      name: 'Gerardo',
      article: 'Birbo Carne 25kg',
      lastDelivery: '26-04-2020'
    },
    {
      name: 'Virginia M.C. Martinez',
      article: 'Nutra Nuggets Verde 15kg',
      lastDelivery: '26-04-2020'
    },
    {
      name: 'Roberto',
      article: 'Eukanuba Adulto Large Breed 15kg',
      lastDelivery: '26-04-2020'
    },
    {
      name: 'Graciela Torron',
      article: 'Nutra azul 25kg',
      lastDelivery: '26-04-2020'
    },
    {
      name: 'Martin Leñeria',
      article: 'Birbo Carne 25kg',
      lastDelivery: '26-04-2020'
    },
    {
      name: 'Fernando Macri',
      article: 'Birbo Carne 25kg',
      lastDelivery: '26-04-2020'
    },
  ]
  
  function logout() {
    invokeLogout(dispatch)
  }
  
  return (
    <View style={styles.container}>
      <Button title='Log out' onPress={logout}/>
      <Text style={styles.welcome}>
        <Text style={styles.username}>Bienvenido Nelson</Text>, 
        mira las entregas para hoy rapidamente aqui debajo:
      </Text>
      <View style={styles.content}>
        <WidgetDashboard title='Programar Llamado' screenToNavigate='Nueva' navigation={navigation} />
        <WidgetDashboard title='Tabla de Registros' screenToNavigate='Entregas' navigation={navigation} />
        <View style={styles.contentListOfToday}>
          {
            list.length > 0 ? 
              <ScrollView style={styles.listOfToday}>
              {
                list.map((item, i) => (
                  <View key={i}>
                    <Divider />
                    <ListItem
                      key={i}
                      title={item.name}
                      titleStyle={{fontSize: 14}}
                      subtitle={item.article}
                      subtitleStyle={{fontSize:13}}
                      rightTitle='ultima entrega'
                      rightTitleStyle={{fontSize: 12}}
                      rightSubtitle={item.lastDelivery}
                    />
                  </View>
                ))
              }
              </ScrollView>
            :
              <View style={{padding:10}}>
                <Text style={{fontStyle: 'italic'}}>No hay registros para hoy</Text>
              </View>  
          }
        </View>
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