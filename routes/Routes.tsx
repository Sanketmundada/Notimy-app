import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import InitScreen from '../screens/InitScreen';
import LoginScreen from '../screens/LoginScreen';
import MainScreen from '../screens/MainScreen';
import SignUp from '../screens/SignUpScreen';

import { StackParamList } from './types';

const Stack = createStackNavigator<StackParamList>();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Init'
        screenOptions={{
          header: () => null,
          cardStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name='Main' component={MainScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignUp} />
        <Stack.Screen name='Init' component={InitScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
