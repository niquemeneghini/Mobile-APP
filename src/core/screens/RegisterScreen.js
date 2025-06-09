import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from '../styles/styles';
import { saveUser, saveUserName } from '../../core/services/authService';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const validateForm = () => {
    const newErrors = {
      name: !name.trim(),
      email: !/^\S+@\S+\.\S+$/.test(email),
      password: password.length < 6,
    };
    setErrors(newErrors);

    if (newErrors.name) {
      Alert.alert('Erro', 'Informe seu nome completo.');
      return false;
    }
    if (newErrors.email) {
      Alert.alert('Erro', 'E-mail inválido.');
      return false;
    }
    if (newErrors.password) {
      Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await saveUser(email, password);
      await saveUserName(name);
      const createdAt = new Date().toLocaleDateString('pt-BR');
       await saveUserCreatedAt(createdAt);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.navigate('Login'); // Assumindo que você tem uma tela de login
    } catch (error) {
      const message =
        error.code === 'auth/email-already-in-use'
          ? 'Este e-mail já está cadastrado.'
          : 'Erro ao cadastrar. Tente novamente.';
      Alert.alert('Erro', message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerTitle}>Criar Conta</Text>

      <TextInput
        style={[styles.input, errors.name && styles.inputError]}
        placeholder="Nome completo"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      {errors.name && <Text style={styles.errorText}>Nome é obrigatório</Text>}

      <TextInput
        style={[styles.input, errors.email && styles.inputError]}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email && <Text style={styles.errorText}>E-mail inválido</Text>}

      <TextInput
        style={[styles.input, errors.password && styles.inputError]}
        placeholder="Senha (mínimo 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errors.password ? (
        <Text style={styles.errorText}>Mínimo 6 caracteres</Text>
      ) : (
        <Text style={styles.passwordHint}>Use pelo menos 6 caracteres</Text>
      )}

      <TouchableOpacity
        style={[styles.registerButton, isLoading && styles.disabledButton]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Cadastrar</Text>
        )}
      </TouchableOpacity>

      <View style={styles.loginLinkContainer}>
        <Text style={styles.loginLinkText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Faça login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}