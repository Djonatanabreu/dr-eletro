import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Dimensions } from 'react-native';
import { Props } from '../../interfaces/routes.interface';
import Private from '../../screens/_layouts/Private';
import Dashboard from '../../screens/Dashboard';
import DrawerCustom from '../../components/DrawerCustom';
import ProductDetails from 'screens/Dashboard/Product/ProductDetails';
import LoginRoutes from 'routes/LoginRoutes';

const Stack = createNativeStackNavigator();

const useLayout = (Component: React.FC<Props>) => (props: any) =>
  (
    <Private>
      <Component {...props} />
    </Private>
  );

const Drawer = createDrawerNavigator();

const ProductRoutes = () => (
  <Stack.Navigator
    initialRouteName="ProductCategoryList"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="ProductCategoryList"
      component={useLayout(Dashboard.ProductCategoryList)}
    />
    <Stack.Screen
      name="ProductList"
      component={useLayout(Dashboard.ProductList)}
    />
    <Stack.Screen name="ProductDetails" component={ProductDetails} />
  </Stack.Navigator>
);

const ScheduleRoutes = () => (
  <Stack.Navigator
    initialRouteName="MySchedule"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen
      name="MySchedule"
      component={useLayout(Dashboard.MySchedule)}
    />
    <Stack.Screen name="Profissionais" component={useLayout(ProductDetails)} />
  </Stack.Navigator>
);

const NewsRoutes = () => (
  <Stack.Navigator
    initialRouteName="Noticias"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="Noticias" component={useLayout(Dashboard.Noticias)} />
    <Stack.Screen
      name="NewsDetail"
      component={useLayout(Dashboard.NewsDetail)}
    />
  </Stack.Navigator>
);

const DashboardStackRoutes = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={props => <DrawerCustom {...props} />}
    screenOptions={{
      headerShown: false,
      drawerStyle: {
        backgroundColor: 'transparent',
        height: '90%',
        marginTop: Dimensions.get('screen').height * 0.06,
      },
      drawerType: 'front',
    }}
  >
    <Drawer.Screen name="Home" component={useLayout(Dashboard.Home)} />
    <Drawer.Screen name="Profile" component={useLayout(Dashboard.Profile)} />
    <Drawer.Screen name="ScheduleRoutes" component={ScheduleRoutes} />
    <Drawer.Screen name="ProductRoutes" component={ProductRoutes} />
    <Drawer.Screen name="AboutUs" component={useLayout(Dashboard.AboutUs)} />
    <Drawer.Screen name="NewsRoutes" component={NewsRoutes} />
    <Stack.Screen name="MyIdeas" component={useLayout(Dashboard.MyIdeas)} />
    <Stack.Screen name="Orders" component={useLayout(Dashboard.Orders)} />
    <Stack.Screen name="LoginRoutes" component={LoginRoutes} />
  </Drawer.Navigator>
);

const PrivateRoutes = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Dashboard" component={DashboardStackRoutes} />
  </Stack.Navigator>
);

export default PrivateRoutes;
