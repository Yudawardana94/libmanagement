import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './pages/Home';
import RentScreen from './pages/RentPage';
import AppointmentListScreen from './pages/AppointmentList';

const Stack = createNativeStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rent" component={RentScreen} />
        <Stack.Screen name="Appointment" component={AppointmentListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigations;
