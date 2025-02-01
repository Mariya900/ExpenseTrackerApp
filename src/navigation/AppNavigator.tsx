import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MMKV} from 'react-native-mmkv';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import HomeScreen from '../screens/Home';
import AddTransationScreen from '../screens/AddTransaction';
import ListTransationScreen from '../screens/ListTransaction';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const mmkv = new MMKV();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="Add Transaction"
        component={AddTransationScreen}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
      <Tab.Screen
        name="List Transactions"
        component={ListTransationScreen}
        options={{
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  console.log('initialRoute====>', initialRoute);

  useEffect(() => {
    const isLoggedIn = mmkv.getBoolean('isLoggedIn');
    setInitialRoute(isLoggedIn ? 'HomeScreen' : 'LoginScreen');
  }, []);
  if (initialRoute === null) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="LoginScreen"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="RegisterScreen"
          options={{headerShown: false}}
          component={RegisterScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          options={{headerShown: false}}
          component={BottomTabNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabelStyle: {
    fontSize: 14,
    fontFamily: 'Georgia',
    fontWeight: 500,
    color: 'black',
  },
});

export default AppNavigator;
