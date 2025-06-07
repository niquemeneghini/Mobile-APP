import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Button, View, Text } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { clearUser } from '../services/authService'; // Certifique-se que o caminho está certo
import Checkout from '../screens/Checkout';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ isLoggedIn, setIsLoggedIn }) {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      {isLoggedIn ? (
        <>
          <Drawer.Screen name="Início" component={HomeScreen} />
          <Drawer.Screen name="Carrinho" component={CartScreen} />
          <Drawer.Screen name="Pagamento" component={Checkout} />
          <Drawer.Screen name="Meus Pedidos" component={OrdersScreen} />
          <Drawer.Screen name="Perfil" component={ProfileScreen} />
<Drawer.Screen
  name="Sair"
  component={() => <View />} // componente vazio
  options={{
    drawerLabel: ({ color }) => (
      <Text style={{ color }}>Sair</Text>
    ),
    drawerItemStyle: { backgroundColor: 'transparent' },
    // manipule a ação fora do botão (abaixo)
  }}
  listeners={{
    drawerItemPress: async (e) => {
      e.preventDefault(); // impedir navegação
      setIsLoggedIn(false); // faz logoff
    },
  }}
/>

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
