import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, Alert, Keyboard, ImageBackground
} from 'react-native';
import styles from '../styles/styles';
import { checkLogin, getUserName } from '../../core/services/authService';

export default function LoginScreen({ setIsLoggedIn, navigation }) {
  const [email, setEmail] = useState('teste@teste.com');
  const [password, setPassword] = useState('123456');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Informe seu e-mail.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Erro', 'E-mail inválido.');
      return false;
    }
    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const valid = await checkLogin(email, password);
      if (!valid) {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
        return;
      }

      const userName = await getUserName();
      console.log(`Login válido: ${userName}`);
      setIsLoggedIn(true);

      navigation.reset({
        index: 0,
        routes: [{ name: 'Home', params: { userName } }],
      });
    } catch (error) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', 'Não foi possível fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
     <ImageBackground
      source={require('../../assets/background.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo!</Text>

        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#ccc" />
        <TextInput style={styles.input} placeholder="Senha" secureTextEntry placeholderTextColor="#ccc" />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
