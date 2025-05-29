import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';
import { getUserName } from '../services/authService';

export default function ProfileScreen() {
  const [name, setName] = useState('');

  useEffect(() => {
    getUserName().then(setName);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      <Text>Nome: {name}</Text>
    </View>
  );
}