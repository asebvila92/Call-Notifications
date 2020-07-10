import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, Image } from 'react-native'
import Header from '../components/layout/header';
import BottomTabBar from '../components/layout/bottomTabBar';
import Home from '../screens/Home';
import Logs from '../screens/Logs';
import NewDelivery from '../screens/newDelivery';
import Deliveries from '../screens/deliveries';
import Profile from '../screens/profile';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      headerMode="screen"
      screenOptions={{
        header: (props) => <Header navigation={props.scene.descriptor.navigation} title={'Home'} />
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

const NewDeliveryStack = createStackNavigator();
function NewDeliveryScreen() {
  return (
    <NewDeliveryStack.Navigator
      headerMode="screen"
      screenOptions={{
        header: (props) => <Header navigation={props.scene.descriptor.navigation} title={'Nueva Entrega'} />
      }}
    >
      <NewDeliveryStack.Screen name="New" component={NewDelivery} />
    </NewDeliveryStack.Navigator>
  );
}

const LogsStack = createStackNavigator();
function LogsStackScreen() {
  return (
    <LogsStack.Navigator
      headerMode='screen'
      screenOptions={{
        header: (props) => <Header navigation={props.scene.descriptor.navigation} title={'Registros'} />
      }}
    >
      <LogsStack.Screen name="Registros" component={Logs} />
    </LogsStack.Navigator>
  );
}

const DeliveriesStack = createStackNavigator();
function DeliveriesStackScreen() {
  return (
    <DeliveriesStack.Navigator
      headerMode='screen'
      screenOptions={{
        header: (props) => <Header navigation={props.scene.descriptor.navigation} title={'Entregas'} />
      }}
    >
      <DeliveriesStack.Screen name="Entregas" component={Deliveries} />
    </DeliveriesStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      headerMode='screen'
      screenOptions={{
        header: (props) => <Header navigation={props.scene.descriptor.navigation} title={'Perfil'} />
      }}
    >
      <ProfileStack.Screen name="Perfil" component={Profile} />
    </ProfileStack.Navigator>
  );
}


const Tab = createBottomTabNavigator();
function AuthBottomNavigator() {
  //createChannelNotification();
  return (
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => <BottomTabBar {...props} />}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeStackScreen} 
          options={{
            title: 'Home',
            tabBarIcon: (props) => {
              const iconImg = props.isFocused ? 
                require('../../assets/bottomBarIcons/home-focus.png') : 
                require('../../assets/bottomBarIcons/home.png')
              return (
                <Image style={styles.tabIcon} source={iconImg} />
              )
            }
          }}
        />
        <Tab.Screen 
          name="Nueva" 
          component={NewDeliveryScreen} 
          options={{
            title: 'Nueva',
            tabBarIcon: (props) => {
              const iconImg = props.isFocused ? 
                require('../../assets/bottomBarIcons/add-focus.png') : 
                require('../../assets/bottomBarIcons/add.png')
              return (
                <Image style={styles.tabIcon} source={iconImg} />
              )
            }
          }}
        />
        <Tab.Screen 
          name="Registros" 
          component={LogsStackScreen} 
          options={{
            title: 'Registros',
            tabBarIcon: (props) => {
              const iconImg = props.isFocused ? 
                require('../../assets/bottomBarIcons/user-list-2.png') : 
                require('../../assets/bottomBarIcons/user-list.png')
              return (
                <Image style={styles.tabIcon} source={iconImg} />
              )
            }
          }}
        />
        <Tab.Screen 
          name="Entregas" 
          component={DeliveriesStackScreen} 
          options={{
            title: 'Entregas',
            tabBarIcon: (props) => {
              const iconImg = props.isFocused ? 
                require('../../assets/bottomBarIcons/user-list-2.png') : 
                require('../../assets/bottomBarIcons/user-list.png')
              return (
                <Image style={styles.tabIcon} source={iconImg} />
              )
            }
          }}
        />
      </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function AuthStackNavigatior() {
  return (
    <Stack.Navigator
    initialRouteName='Tabs'
      headerMode="screen"
    >
      <Stack.Screen 
        name='Perfil' 
        options={{headerShown:false}} 
        component={ProfileStackScreen} />
      <Stack.Screen 
        name='Tabs' 
        options={{headerShown:false}} 
        component={AuthBottomNavigator} />
      
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30, 
    height: 30,
    resizeMode: 'contain'
  },
})