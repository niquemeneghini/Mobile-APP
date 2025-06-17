import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { saveUser, checkLogin, getUserName } from '../../core/services/authService';

const backgroundImage = require('../../assets/background.png');

const RegisterScreen = ({ setIsLoggedIn, navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isFormValid = name.trim() && /^\S+@\S+\.\S+$/.test(email) && password.length >= 6;

  const handleRegister = async () => {
    Keyboard.dismiss();
    if (!isFormValid) {
      Toast.show({
        type: 'error',
        text1: 'Dados inválidos',
        text2: 'Preencha todos os campos corretamente.',
      });
      return;
    }

    setIsLoading(true);
    try {
      await saveUser(email, password, name);

      const isLogged = await checkLogin(email, password);
      if (isLogged) {
        const userName = await getUserName();
        setIsLoggedIn(true);

        Toast.show({
          type: 'success',
          text1: 'Cadastro realizado!',
          text2: `Bem-vindo, ${userName}`,
        });

        navigation.reset({
          index: 0,
          routes: [{ name: 'Home', params: { userName } }],
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao cadastrar',
        text2: error.message || 'Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      
  source={backgroundImage}
  style={styles.background}
  resizeMode="cover"
  blurRadius={2}

    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Criar conta</Text>

            <TextInput
              placeholder="Nome"
              placeholderTextColor="#999"
              value={name}
              onChangeText={setName}
              style={styles.input}
              autoCapitalize="words"
            />

            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#999"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              placeholder="Senha"
              placeholderTextColor="#999"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />

            <TouchableOpacity
              onPress={handleRegister}
              style={[styles.button, (!isFormValid || isLoading) && styles.buttonDisabled]}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#121212" />
              ) : (
                <Text style={styles.buttonText}>Cadastrar</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Já tem uma conta? Entrar</Text>
            </TouchableOpacity>
          </View>
          <Toast />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 24,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    color: '#fff',
  },
  button: {
    backgroundColor: '#bb86fc',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#bb86fc',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
});

export default RegisterScreen;
