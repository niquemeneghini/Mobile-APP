import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { checkLogin } from '../services/authService';

export default function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    const valid = await checkLogin(email, password);
    if (valid) {
      setIsLoggedIn(true);
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}