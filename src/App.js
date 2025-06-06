import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './core/navigation/DrawerNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <NavigationContainer>
        <DrawerNavigator 
            key={isLoggedIn ? 'logged-in' : 'logged-out'} 
            isLoggedIn={isLoggedIn} 
            setIsLoggedIn={setIsLoggedIn} 
        />
      </NavigationContainer>
      <Toast />
    </>
  );
}