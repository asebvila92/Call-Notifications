import * as React from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from './src/screens/Home';
import Logs from './src/screens/Logs';

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      headerMode="screen"
    >
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleAlign: "center",
          headerTintColor: '#ffff',
          headerStyle: {
            backgroundColor: "#2196f3"
          },
        }}
      />
    </HomeStack.Navigator>
  );
}

const LogsStack = createStackNavigator();
function LogsStackScreen() {
  return (
    <LogsStack.Navigator>
      <LogsStack.Screen
        name="Registros"
        component={Logs}
        options={{
          headerTitleAlign: "center",
          headerTintColor: '#ffff',
          headerStyle: {
            backgroundColor: "#2196f3"
          },
        }}
      />
    </LogsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationNativeContainer>
      <Tab.Navigator
        initialRouteName="Nueva"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Nueva') {
              iconName = 'plus-circle';
            } else if (route.name === 'Registros') {
              iconName = 'tags';
            }

            // You can return any component that you like here!
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 15
          }
        }}>
        <Tab.Screen name="Nueva" component={HomeStackScreen} />
        <Tab.Screen name="Registros" component={LogsStackScreen} />
      </Tab.Navigator>
    </NavigationNativeContainer>
  );
}

export default App


