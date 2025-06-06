import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    try {
      const userData = { name, email, password };
      await AsyncStorage.setItem('@user', JSON.stringify(userData));
      Alert.alert('Sucesso', 'Usuário registrado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar os dados');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}

/* 
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/styles';
import { saveUser, saveUserName } from '../services/authService';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister() {
    await saveUser(email, password);
    await saveUserName(name);
    Alert.alert('Sucesso', 'Usuário registrado com sucesso');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput style={styles.input} placeholder="Nome" onChangeText={setName} />
      <TextInput style={styles.input} placeholder="E-mail" onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
}
  */