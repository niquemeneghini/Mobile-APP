
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function LoginScreen({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin() {
    try {
      const userData = await AsyncStorage.getItem('@user');
      if (userData) {
        const { email: storedEmail, password: storedPassword } = JSON.parse(userData);
        if (email === storedEmail && password === storedPassword) {
          setIsLoggedIn(true);
        } else {
          Alert.alert('Erro', 'E-mail ou senha incorretos');
        }
      } else {
        Alert.alert('Erro', 'Nenhum usuário registrado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro ao acessar os dados');
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

/*
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
  */