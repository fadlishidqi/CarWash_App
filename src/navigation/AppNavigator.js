// src/navigation/AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import BottomTabs from './BottomTabs';
import SplashScreen from '../screens/SplashScreen';
import Register from '../screens/auth/Register';
import Login from '../screens/auth/Login';
import MakeOrder from '../screens/MakeOrder';
import HistoryDetail from '../screens/HistoryDetail';
import Profile from '../screens/Profile';


const Stack = createStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false 
        }}
      >
        {!user ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={BottomTabs} />
            <Stack.Screen name="MakeOrder" component={MakeOrder} />
            <Stack.Screen name="HistoryDetail" component={HistoryDetail} />
            <Stack.Screen name="Profile" component={Profile} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}