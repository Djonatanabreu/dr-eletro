import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PrivateRoutes from './PrivateRoutes';

import LoginRoutes from './LoginRoutes';
import useAuthStore from 'store/auth';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const signed = useAuthStore(state => state.signed);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PrivateStack" component={PrivateRoutes} />
        {/* {signed ? (
        ) : (
          <Stack.Screen name="LoginRoutes" component={LoginRoutes} />
        )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
