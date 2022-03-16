import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Entypo, FontAwesome, Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { Routes } from './src/pages/index';
import colors from './global/colors';

import { SettingsProvider } from './src/contexts/SettingsContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SettingsProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: route.name === 'Home' && { display: 'none' },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'AddProduct') {
                iconName = 'circle-with-plus';
              } else if (route.name === 'SellProduct') {
                iconName = 'dollar-sign';
              } else if (route.name === 'ListAll') {
                iconName = 'list';
              } else if (route.name === 'FindProduct') {
                iconName = 'ios-search-circle';
              } else if (route.name === 'CloseToExpiration') {
                iconName = 'warning';
              }

              if (
                route.name === 'Home' ||
                route.name === 'AddProduct' ||
                route.name === 'ListAll'
              ) {
                return (
                  <Entypo name={iconName} size={36} color={colors.tertiary} />
                );
              } else if (route.name === 'FindProduct') {
                return (
                  <Ionicons name={iconName} size={40} color={colors.tertiary} />
                );
              } else if (route.name === 'CloseToExpiration') {
                return (
                  <FontAwesome
                    name={iconName}
                    size={36}
                    color={colors.tertiary}
                  />
                );
              } else {
                return (
                  <FontAwesome5
                    name={iconName}
                    size={36}
                    color={colors.tertiary}
                  />
                );
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          {Routes.map((route: any, index: number) => (
            <Tab.Screen
              name={route.name}
              component={route.component}
              key={index}
              options={{
                title: '',
                tabBarItemStyle: route.name === 'Scanner' && {
                  display: 'none',
                },
                tabBarIconStyle: route.name === 'Scanner' && {
                  display: 'none',
                },
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </SettingsProvider>
  );
}
