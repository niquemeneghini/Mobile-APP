import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './core/navigation/DrawerNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavigationContainer>
        <DrawerNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </NavigationContainer>
      <Toast /> {/* Isso exibe os toasts como "Produto adicionado!" */}
    </>
  );
}
