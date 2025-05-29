import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Início" component={HomeScreen} />
          <Drawer.Screen name="Carrinho" component={CartScreen} />
          <Drawer.Screen name="Meus Pedidos" component={OrdersScreen} />
          <Drawer.Screen name="Perfil" component={ProfileScreen} />
        </>
      ) : (
        <>
          <Drawer.Screen name="Login">
            {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Drawer.Screen>
          <Drawer.Screen name="Registrar" component={RegisterScreen} />
        </>
      )}
    </Drawer.Navigator>
  );
}
